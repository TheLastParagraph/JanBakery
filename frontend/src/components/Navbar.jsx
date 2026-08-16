import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleNav = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
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
          {isSearchOpen ? (
            <form onSubmit={handleSearchSubmit} className="header-search-form">
              <input 
                type="text" 
                autoFocus
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="header-search-input"
                onBlur={() => { if(!searchQuery) setIsSearchOpen(false) }}
              />
            </form>
          ) : (
            <button className="icon-btn" onClick={() => setIsSearchOpen(true)}>
              <Search size={20} />
            </button>
          )}
          <Link to="/cart" className="cart-btn">
            <ShoppingCart size={20} />
            {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
          </Link>
        </div>
      </div>

      <div className="logo">
        <Link to="/" style={{color: 'inherit', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div className="logo-title">Jan Bakery.</div>
          <div className="logo-divider"></div>
          <div className="logo-est">EST. 1999</div>
        </Link>
      </div>
      
      <nav className="nav-links desktop-only">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop Menu</Link>
        <Link to="/digital-menu">Digital Menu</Link>
        <Link to="/about">About</Link>
        <a href="/#reviews">Reviews</a>
        <a href="/#contact">Contact Us</a>
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
                <a href="#" onClick={(e) => { e.preventDefault(); handleNav('/'); }}>Home</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNav('/shop'); }}>Shop Menu</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNav('/digital-menu'); }}>Digital Menu</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNav('/about'); }}>About</a>
                <a href="/#contact" onClick={() => setIsOpen(false)}>Contact Us</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNav('/cart'); }}>Cart ({getCartCount()})</a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
