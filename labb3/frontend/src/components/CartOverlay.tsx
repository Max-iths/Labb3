import React from 'react';
import { useCart } from '../context/CartContext';

interface CartOverlayProps {
    onClose: () => void;
    isOpen: boolean;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ onClose, isOpen }) => {
    const { cart, totalPrice, removeFromCart, clearCart, updateQuantity } = useCart();

    if(!isOpen) return null;

    return (
        <div className="cart-overlay">
            <div className="cart-container" onClick={(e) => e.stopPropagation()}>
                <button className="close-cart" onClick= {onClose}>x</button>
                <h3>Your Cart</h3>

                {cart.length === 0 ? (
                <p>Your cart is empty</p>
                ) : (
                    <>
                        <ul className="cart-items">
                            {cart.map(item => (
                                <li key={item.id} className="cart-item">
                                    <div>
                                        <p><strong>{item.name}</strong></p>
                                        <p>${item.price.toFixed(2)}</p>
                                        <div className="item-quantity">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="remove-button">Remove</button>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-summary">
                            <p>Total: ${totalPrice.toFixed(2)}</p>
                            <button onClick={clearCart} className="clear-cart-button">Clear Cart</button>
                        </div>
                    </>
                )}
            </div>

        <style> {`
            .cart-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            .cart-container {
                background-color: white;
                padding: 20px;
                border-radius: 8px;
                width: 90%;
                max-width: 500px;
                position: relative;
            }
            .close-cart {
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
            }
            .cart-items {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .cart-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }
            .item-quantity {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .item-quantity button {
                background-color: #f0f0f0;
                border: none;
                padding: 5px 10px;
                cursor: pointer;
            }
            .item-quantity button:disabled {
                background-color: #ccc;
                cursor: not-allowed;
            }
            .remove-button {
                background-color: #ff4d4d;
                color: white;
                border: none;
                padding: 5px 10px;
                cursor: pointer;
            }
            .cart-summary {
                margin-top: 20px;
                text-align: right;
            }
            .clear-cart-button {
                background-color: #28a745;
                color: white;
                border: none;
                padding: 10px 15px;
                cursor: pointer;
            }
        `}
        </style>
        </div>
    );
}

export default CartOverlay;
