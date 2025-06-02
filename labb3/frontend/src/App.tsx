
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Cart from './views/Cart';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';


function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />

          <Routes>
            <Route path="/" element={<ProductList />}/>
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />

          </Routes>

      </Router>
    </CartProvider>
  );
}

export default App;
