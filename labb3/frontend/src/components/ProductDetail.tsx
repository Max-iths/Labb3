import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product, fetchProductById, fetchProducts } from '../services/api';
import { useCart } from '../context/CartContext';

const { addToCart } = useCart();



function ProductDetail() {

    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null >(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getProduct() {
            if (!id) return;
            try {
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        }
    getProduct();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="ProductDetail">
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} style={{ maxWidth: '300px' }} />
            <p><strong>{product.description}</strong></p>
            <p><strong>Price: ${product.price}</strong></p>
            <button onClick={() => product && addToCart(product)}>
                Add to Cart
            </button>
        </div>
    )
}

export default ProductDetail;
