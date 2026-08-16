import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2 } from 'lucide-react';
import './Cart.css';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <section className="cart-page container empty-cart">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <button onClick={() => navigate('/shop')} className="btn-black mt-2">
          Continue Shopping
        </button>
      </section>
    );
  }

  return (
    <section className="cart-page container">
      <motion.div 
        className="cart-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="section-title">Your Cart</h1>
      </motion.div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <motion.div 
              key={item.id} 
              className="cart-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-details">
                <h3><Link to={`/product/${item.id}`}>{item.name}</Link></h3>
                <p className="cart-item-price">₹{item.price}</p>
              </div>
              <div className="cart-item-actions">
                <div className="qty-controls small">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={20} />
                </button>
              </div>
              <div className="cart-item-total">
                ₹{item.price * item.quantity}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="cart-summary"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{getCartTotal()}</span>
          </div>
          <div className="summary-row">
            <span>Taxes & Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="summary-row total">
            <span>Total Estimated</span>
            <span>₹{getCartTotal()}</span>
          </div>
          <button 
            className="btn-black checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </motion.div>
      </div>
    </section>
  );
}
