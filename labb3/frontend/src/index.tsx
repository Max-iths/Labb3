import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './context/CartContext';

const container = document.getElementById('root');
if (!container) throw new Error('Root container missing in index.html');

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <CartProvider>
        <App />
    </CartProvider>
  </React.StrictMode>
);

reportWebVitals(console.log);
