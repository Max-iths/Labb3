import ProductList from './components/ProductList';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Cart from './views/Cart';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>

    </Router>
  );
}

export default App;
