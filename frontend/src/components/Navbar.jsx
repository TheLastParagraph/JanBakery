import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleNav = (path) => {
    setIsOpen(false);
    navigate(path);
  };

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
          <Link to="/cart" className="cart-btn">
            <ShoppingCart size={20} />
            {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
          </Link>
        </div>
      </div>

      <div className="logo"><Link to="/" style={{color: 'inherit', textDecoration: 'none'}}>Jan Bakery</Link></div>
      
      <nav className="nav-links desktop-only">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop Menu</Link>
        <Link to="/#about">About</Link>
        <Link to="/#reviews">Reviews</Link>
      </nav>

      <div className="nav-actions desktop-only">
        <Link to="/cart" className="cart-btn">
          <ShoppingCart size={20} />
          {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
        </Link>
      </div>

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
                <a href="#" onClick={(e) => { e.preventDefault(); handleNav('/'); }}>Home</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNav('/shop'); }}>Shop Menu</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNav('/cart'); }}>Cart ({getCartCount()})</a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
