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
            VALUES (?)
        `, [
            'Bags'
        ]);
    }


    //Inserting test data into products table if empty
    const testProducts = await database.get('SELECT COUNT(*) AS count FROM products');
    if(testProducts.count === 0) {
        await database.run(`
            INSERT INTO products (name, description, price, image, category_id)
            VALUES (?,?,?,?,?)
        `, [
            'Crochet Tote',
            'Handmade crochet baag with star pattern',
            25.00,
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcrochetcreationlovers.com%2Fproduct%2Fcrochet-pattern-crochet-star-bag-pattern-crochet-star-pattern-bag-crochet-pattern&psig=AOvVaw06-KqVTPo019xUWd5ZzR8i&ust=1748465362690000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNicq5rDxI0DFQAAAAAdAAAAABAE',
            1
        ]);
    }




    console.log('Database is ready');

})();

const app = express();

app.use(cors());

app.use(express.json());

// Fetching all products on the product page
app.get('/products', async (req, res) => {
    try {
        const products = await database.all('SELECT * FROM products');
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
