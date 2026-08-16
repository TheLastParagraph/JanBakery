import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <motion.h1 
          className="hero-title"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-orange">Jan Bakery</span><br/>
          Magam
        </motion.h1>
        
        <motion.p 
          className="hero-desc"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Bakery • Café • Confectionery. Located at Kalan Complex, Gulmarg Road. Fresh daily from 9:30 AM to 9:30 PM.
        </motion.p>
        
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Jan+Bakery%2C+Magam%2C+Jammu+and+Kashmir&utm_source=janbakery.isbest.org" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-black" 
            style={{ display: 'inline-block', textDecoration: 'none' }}
          >
            Visit Us Today
          </a>
        </motion.div>
      </div>

      <motion.div 
        className="hero-image-wrapper"
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img src="/hero.png" alt="Hero Product" className="hero-img" />
      </motion.div>
    </section>
  );
}
