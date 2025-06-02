import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, Category, fetchProducts, fetchCategories } from '../services/api';
import './ProductList.css';


export default function ProductList() {

    const [products, setProducts ] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    useEffect(() => {
        fetchCategories()
            .then(setCategories)
            .catch(err=> console.error('Failed to fetch categories', err));
    }, []);


    useEffect(() => {
        fetchProducts(selectedCategory ?? undefined)
            .then(setProducts)
            .catch(err => console.error(err));
    }, [selectedCategory]);

    return (
        <div>
            <h1 className="products-title">Products</h1>

            {/* Category filter dropdown */}
            <div className="category-filter">
                <label htmlFor="category-select">Filter by Category:</label>
                <select
                    id="category-select"
                    value={selectedCategory ?? ''}
                    onChange={(e) => {
                        const val = e.target.value;
                        setSelectedCategory(val ? Number(val) : null);
                    }}
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (

                <div className="product-list">
                    {products.map(product => (
                        <div className="product-card" key={product.id}>
                            <Link to={`/products/${product.id}`}>
                                <img src={product.image} alt={product.name} style={{ width: '100px' }} />
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <p>Price: ${product.price}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
