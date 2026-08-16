import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    instructions: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Format WhatsApp message
    let message = `*New Order - Jan Bakery*%0A%0A`;
    message += `*Customer Details:*%0A`;
    message += `Name: ${formData.name}%0A`;
    message += `Phone: ${formData.phone}%0A`;
    message += `Address: ${formData.address}%0A`;
    if (formData.instructions) {
      message += `Instructions: ${formData.instructions}%0A`;
    }
    
    message += `%0A*Order Items:*%0A`;
    cartItems.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (₹${item.price * item.quantity})%0A`;
    });
    
    message += `%0A*Total Estimated:* ₹${getCartTotal()}%0A`;
    message += `%0APlease confirm my order. Thank you!`;

    // Jan Bakery WhatsApp Number (from info.txt)
    const whatsappNumber = '919797734717';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Clear cart and redirect
    clearCart();
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page container empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/shop')} className="btn-black">Back to Shop</button>
      </div>
    );
  }

  return (
    <section className="checkout-page container">
      <motion.div 
        className="checkout-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="section-title">Checkout</h1>
        <p className="section-subtitle">Complete your details to place the order via WhatsApp.</p>
      </motion.div>

      <div className="checkout-content">
        <motion.form 
          className="checkout-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3>Delivery Details</h3>
          
          <div className="form-group">
            <label>Full Name*</label>
            <input 
              type="text" 
              name="name" 
              required 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="form-group">
            <label>Phone Number*</label>
            <input 
              type="tel" 
              name="phone" 
              required 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="e.g. +91 9876543210"
            />
          </div>

          <div className="form-group">
            <label>Delivery Address*</label>
            <textarea 
              name="address" 
              required 
              rows="3" 
              value={formData.address} 
              onChange={handleChange}
              placeholder="Full address for delivery"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Special Instructions (Optional)</label>
            <textarea 
              name="instructions" 
              rows="2" 
              value={formData.instructions} 
              onChange={handleChange}
              placeholder="Any special requests or delivery instructions"
            ></textarea>
          </div>

          <button type="submit" className="place-order-btn">
            Place Order via WhatsApp
          </button>
        </motion.form>

        <motion.div 
          className="checkout-summary"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Your Order</h3>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <span className="item-name">{item.quantity}x {item.name}</span>
                <span className="item-price">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total to pay</span>
            <span>₹{getCartTotal()}</span>
          </div>
          <p className="whatsapp-notice">
            By clicking "Place Order", you will be redirected to WhatsApp to complete and confirm your order with our bakery directly.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
