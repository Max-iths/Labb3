const express = require('express')
const cors = require('cors')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

let database;

(async () => {
    database = await sqlite.open({
        filename: './labb3.db',
        driver: sqlite3.Database
    })

    await database.run('PRAGMA foreign_keys = ON');

    await database.run('DROP TABLE IF EXISTS products');
    await database.run('DROP TABLE IF EXISTS categories');

    // Creating the categories table
    await database.run(`
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `);

    // Creating the products table
    await database.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            price REAL NOT NULL,
            image TEXT NOT NULL,
            category_id INTEGER NOT NULL,
            FOREIGN KEY (category_id) REFERENCES categories(id)
        )
    `);

    // Inserting test data into categories table if empty
    const testCategories = await database.get('SELECT COUNT(*) AS count FROM categories');
    if(testCategories.count === 0) {
        await database.run(`
            INSERT INTO categories (name)
            VALUES (?), (?), (?), (?)
        `, [
            'Bags', 'Hats', 'Sweaters', 'Blankets'
        ]);
    }


    //Inserting test data into products table if empty
    const testProducts = await database.get('SELECT COUNT(*) AS count FROM products');
    if(testProducts.count === 0) {
        await database.run(`
            INSERT INTO products (name, description, price, image, category_id)
            VALUES
            (?,?,?,?,?),
            (?,?,?,?,?),
            (?,?,?,?,?),
            (?,?,?,?,?),
            (?,?,?,?,?),
            (?,?,?,?,?),
            (?,?,?,?,?),
            (?,?,?,?,?),
            (?,?,?,?,?),
            (?,?,?,?,?)
        `, [
            'Crochet Tote',
            'Handmade crochet bag with star pattern',
            25.00,
            'https://di2ponv0v5otw.cloudfront.net/posts/2023/04/06/642ebb4d52eee12fdc55004e/m_642ebb5fdbb0e70eb78b240d.jpg',
            1,

            'Strawberry Bucket Hat',
            'Cute bucket hat with strawberry pattern',
            20.00,
            'https://i.etsystatic.com/20968067/r/il/394a74/2619376366/il_570xN.2619376366_o44w.jpg',
            2,

            'Pumpkin Hat',
            'Handmade pumpkin hat for the fall season',
            15.00,
            'https://oombawkadesigncrochet.com/wp-content/uploads/2023/08/pumpkin2-717x1024.jpg', 2,

            'Striped Wool Sweater',
            'Cozy wool sweater for chilly days',
            30.00,
            'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiDRVI0dtm1jd1A2wW0c6OZfXOobpZhV1RQfgza4UZ4fpapG3xVbaLraJNEndqenchlg4MAKdmE1kdf8wHRAGZbLNFlsGWcBFG2DWOS5HGKy59uNgDHnBXD1-NfGvrUxhyk6ZtYG_ftNsHl/w665-rw/cheshire-dreams-sweater5+noWM.jpeg',3,

            'Granny Square Bag',
            'Colorful granny square bag for everyday use',
            22.00,
            'https://i.etsystatic.com/31590469/r/il/74ca3c/3653532721/il_1080xN.3653532721_rfpl.jpg',1,

            'Purple and pink star blanket',
            'Soft and warm purple and pink star blanket for babies',
            45.00,
            'https://i.etsystatic.com/20673071/r/il/f3454b/2815515351/il_570xN.2815515351_c4y7.jpg', 4,

            'Crochet Notebook Bllanket',
            'Crochet notebook blanket for cozy reading',
            50.00,
            'https://i.redd.it/zupqssdyooha1.jpg', 4,


            'Frog Hat for Cats',
            'Adorable frog hat for your feline friend',
            18.00,
            'https://crealandia.com/wp-content/uploads/2022/05/IMG_7243-rotated.jpg', 2,

            'Flower Cardigan',
            'Handmade flower cardigan for spring',
            35.00,
            'https://sugercandy.com/cdn/shop/products/light-blue-picnic-crochet-cardigan-102321.jpg?v=1718957663', 3,

            'Granny Square Blanket',
            'Cozy granny square blanket for home decor',
            55.00,
            'https://www.anniedesigncrochet.com/wp-content/uploads/2024/02/rainbow-harmony-blanket-6-sq.jpg', 4
        ]);
    }




    console.log('Database is ready');

})();

const app = express();

app.use(cors());

app.use(express.json());

// Fetching all products on the product page and sorting by category if provided
app.get('/products', async (req, res) => {

    const { category_id } = req.query;
    const categoryId = Number(category_id);

    try {
        let products;


        if (categoryId) {
            products = await database.all('SELECT * FROM products WHERE category_id = ?', categoryId);
        } else {
            products = await database.all('SELECT * FROM products');
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const product = await database.get('SELECT * FROM products WHERE id = ?', req.params.id);
        if (!product) return res.status(404).json({ error: 'Products not found'});
        res.json(product);
    } catch (error) {
        res.status(500),json({ error: error.message});
    }
})

app.get('/categories', async (req, res) => {
    try {
        const categories = await database.all('SELECT * FROM categories');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.post('/products', async (req, res) => {
    const { name, description, price, image, category_id } = req.body;

    if( !name || !description || !price || !image || !category_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await database.run(`
            INSERT INTO products (name, description, price, image, category_id)
            VALUES (?, ?, ?, ?, ?)
            `, [name, description, price, image, category_id]);

        const newProduct = await database.get('SELECT * FROM products WHERE id = ?', result.lastID);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add product' });
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
