import React from 'react';
import { motion } from 'framer-motion';
import './StatsSection.css';

export default function StatsSection() {
  const stats = [
    { value: "4.2", label: "Average Rating" },
    { value: "230+", label: "Positive Reviews" },
    { value: "100%", label: "Fresh Daily" },
    { value: "Local", label: "Magam Bakery" },
  ];

  return (
    <section className="container">
      <motion.div 
        className="stats-card"
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut", type: "spring", bounce: 0.2 }}
      >
        <div className="stats-content">
          <h2 className="section-title text-orange">Jan Bakery</h2>
          <p className="section-subtitle">
            Magam's Favorite Bakery.
          </p>
          <p className="stats-desc">
            We are dedicated to providing the freshest and most delicious baked goods to our local community. Rated highly by our customers, we invite you to experience the quality for yourself.
          </p>
          <button className="primary-btn mt-2">Visit Us</button>
        </div>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
