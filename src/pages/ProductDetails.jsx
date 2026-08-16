import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="product-not-found container">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/shop')} className="btn-black">Back to Shop</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <section className="product-details-page container">
      <div className="product-layout">
        <motion.div 
          className="product-image-container"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={product.image} alt={product.name} className="product-main-image" />
        </motion.div>

        <motion.div 
          className="product-info-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="product-category">{product.category}</p>
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">₹{product.price}</p>
          
          <div className="product-description">
            <p>{product.description}</p>
          </div>

          <div className="quantity-selector">
            <label>Quantity</label>
            <div className="qty-controls">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="qty-btn"
              >-</button>
              <span className="qty-value">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="qty-btn"
              >+</button>
            </div>
          </div>

          <div className="product-actions">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              Buy it Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
