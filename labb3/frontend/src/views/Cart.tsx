import React from 'react';
import { useCart } from '../context/CartContext';


function Cart() {
    const { cartItems, totalPrice, removeFromCart, clearCart } = useCart();

    if(cartItems.length === 0 ) return <div>Your cart is empty</div>;

    return (
        <div>
            <h2>Your Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key= {item.id}>
                        <h3>{item.name}</h3>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <button onClick={clearCart}>Clear Cart</button>
        </div>
    )
};

export default Cart;
