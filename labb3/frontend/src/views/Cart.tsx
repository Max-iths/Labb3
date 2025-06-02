import React from 'react';
import { useCart } from '../context/CartContext';
import { clear } from 'console';



function Cart() {
    const { cart, totalPrice, removeFromCart, clearCart, updateQuantity } = useCart();

    if(cart.length === 0 ) return <div>Your cart is empty</div>;

    return (
        <>
            <div className="cartContainer">
                <h2 className="cart-title">Your Cart</h2>

                <div className="cart-list">
                    {cart.map(item => (
                        <div className="cart-item" key= {item.id}>
                            <div className="cart-item-info">
                                <h3 className="item-name">{item.name}</h3>
                                <p className="item-price">{item.price.toFixed(2)}</ p>
                                <div className="item-quantity">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="remove-button">Remove</button>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <p className="total-price">Total: ${totalPrice.toFixed(2)}</p>
                    <button onClick={clearCart} className="clear-cart-button">
                    Clear Cart
                    </button>
                </div>
            </div>

            <style>{`
            .cartContainer {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 8px;
            }
            .cart-title {
                text-align: center;
                margin-bottom: 20px;
                font-size: 24px;
            }
            .cart-list {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            .cart-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border: 1px solid #ddd;
                padding: 10px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .cart-item-info {
                flex: 1;
            }
            .item-name {
                font-size: 18px;
                margin: 0;
            }
            .item-price {
                font-size: 16px;
                color: #333;
            }
            .item-quantity {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .item-quantity button {
                padding: 5px 10px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            .item-quantity button:disabled {
                background-color: #ccc;
                cursor: not-allowed;
            }
            .remove-button {
                padding: 5px 10px;
                background-color: #dc3545;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            .remove-button:hover {
                background-color: #c82333;
            }
            .cart-summary {
                margin-top: 20px;
                text-align: right;
            }
            .total-price {
                font-size: 20px;
                font-weight: bold;
            }
            .clear-cart-button {
                padding: 10px 15px;
                background-color: #28a745;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            .clear-cart-button:hover {
                background-color: #218838;
            }

            `}
            </style>
        </>
    )
};

export default Cart;
