import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartOverlay from "./CartOverlay";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
    const { cart } = useCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    const [isOpen, setCartOpen] = useState(false);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <Link to="/">Crochet Corner</Link>
                </div>
                <ul className="navbar-menu">
                    <Link to="/">Products</Link>
                    <Link to="/about">Categories</Link>
                    <button onClick={() => setCartOpen(true)}>
                        Cart ({totalItems})
                    </button>
                </ul>
            </nav>

            {/* Cart Overlay */}
            <CartOverlay isOpen={isOpen} onClose={() => setCartOpen(false)} />
        </>
    );
};

export default Navbar;
