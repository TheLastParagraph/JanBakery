import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header 
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-left-mobile">
        <button className="icon-btn mobile-menu-btn" onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
        <div className="nav-actions">
          <button className="icon-btn"><Search size={20} /></button>
          <button className="cart-btn"><ShoppingCart size={20} /></button>
        </div>
      </div>

      <div className="logo">Jan Bakery</div>
      
      <nav className="nav-links desktop-only">
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#about">About</a>
        <a href="#reviews">Reviews</a>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              className="mobile-overlay" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              className="mobile-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <button className="close-drawer-btn" onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
              <nav className="mobile-nav-links">
                <a href="#home" onClick={() => setIsOpen(false)}>Home</a>
                <a href="#products" onClick={() => setIsOpen(false)}>Products</a>
                <a href="#about" onClick={() => setIsOpen(false)}>About</a>
                <a href="#reviews" onClick={() => setIsOpen(false)}>Reviews</a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
