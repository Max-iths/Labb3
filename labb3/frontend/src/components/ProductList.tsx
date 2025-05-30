import React, { useEffect, useState } from 'react';

import { Product, fetchProductById, fetchProducts } from '../services/api';



export default function ProductList() {

    const [products, setProducts ] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch(err => console.error(err));
    }, []);

    return (
    <div>
        <h1>Products</h1>
        {products.map(product => (
            <div key={product.id}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <img src={product.image} alt={product.name} style={{ width: '100px' }} />
            </div>
        ))}
    </div>
);

}
