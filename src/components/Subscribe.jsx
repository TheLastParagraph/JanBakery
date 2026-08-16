import React from 'react';
import { motion } from 'framer-motion';
import './Subscribe.css';

export default function Subscribe() {
  return (
    <section className="container">
      <motion.div 
        className="subscribe-card"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        <div className="sub-content">
          <h2>Subscribe for the daily Updates</h2>
          <p>Drop us your email to get started on ordering your favourite product</p>
        </div>
        <div className="sub-form">
          <input type="email" placeholder="Enter your email address" />
          <button className="sub-btn">&rarr;</button>
        </div>
      </motion.div>
    </section>
  );
}
