import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import './Shop.css';

export default function Shop() {
  const { addToCart } = useCart();

  return (
    <section className="shop-page container">
      <motion.div 
        className="shop-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="section-title">Our Menu</h1>
        <p className="section-subtitle">
          Browse our selection of freshly baked goods, pastries, and custom cakes.
        </p>
      </motion.div>

      <div className="shop-grid">
        {products.map((product, index) => (
          <motion.div 
            key={product.id} 
            className="shop-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={`/product/${product.id}`} className="shop-card-link">
              <div className="shop-img-wrapper">
                <img src={product.image} alt={product.name} className="shop-img" />
              </div>
              <div className="shop-info">
                <p className="shop-category">{product.category}</p>
                <h3 className="shop-title">{product.name}</h3>
                <p className="shop-price">₹{product.price}</p>
              </div>
            </Link>
            <button 
              className="add-to-cart-btn"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
            >
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
