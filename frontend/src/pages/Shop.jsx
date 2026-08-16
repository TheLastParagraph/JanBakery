import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { 
  Search, MapPin, Calendar, Heart, Star, 
  ChevronDown, Grid, List, SlidersHorizontal 
} from 'lucide-react';
import './Shop.css';

export default function Shop() {
  const { addToCart } = useCart();
  const [view, setView] = useState('grid');
  const [priceRange, setPriceRange] = useState(41000);

  return (
    <div className="shop-template-page">
      {/* 1. TOP BANNER & SEARCH OVERLAY */}
      <div className="shop-banner-container">
        <div className="shop-banner-bg"></div>
        
        {/* Floating Search Pill */}
        <div className="search-pill-container">
          <div className="search-pill">
            <div className="search-field">
              <MapPin size={20} className="field-icon" />
              <div className="field-text">
                <span className="field-label">Search</span>
                <input type="text" placeholder="What are you craving?" className="field-input" />
              </div>
            </div>
            
            <div className="search-divider"></div>
            
            <div className="search-field">
              <Calendar size={20} className="field-icon" />
              <div className="field-text">
                <span className="field-label">Category</span>
                <input type="text" placeholder="Add category" className="field-input" />
              </div>
            </div>
            
            <div className="search-divider"></div>
            
            <div className="search-field">
              <Calendar size={20} className="field-icon" />
              <div className="field-text">
                <span className="field-label">Dietary</span>
                <input type="text" placeholder="e.g., Eggless" className="field-input" />
              </div>
            </div>
            
            <button className="search-btn">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="shop-main-layout container">
        
        {/* Left Sidebar */}
        <aside className="shop-sidebar">
          
          <div className="filter-box">
            <div className="filter-header">
              <h3>Filter Price</h3>
              <ChevronDown size={18} />
            </div>
            <div className="filter-content">
              <div className="range-slider-mock">
                <div className="range-track">
                  <div className="range-fill"></div>
                  <div className="range-handle left-handle"></div>
                  <div className="range-handle right-handle"></div>
                </div>
              </div>
              
              <div className="price-inputs">
                <div className="price-input-box">
                  <label>Min price</label>
                  <input type="text" value="₹0" readOnly />
                </div>
                <div className="price-input-box">
                  <label>Max price</label>
                  <input type="text" value={`₹${priceRange.toLocaleString()}`} readOnly />
                </div>
              </div>
              
              <div className="filter-actions">
                <button className="btn-clear">Clear</button>
                <button className="btn-apply">Apply</button>
              </div>
            </div>
          </div>

          <div className="filter-box">
            <div className="filter-header">
              <h3>Review Score</h3>
              <ChevronDown size={18} />
            </div>
            <div className="filter-content">
              <div className="checkbox-list">
                {[5, 4, 3, 2, 1].map(num => (
                  <label key={num} className="checkbox-item">
                    <input type="checkbox" />
                    <span className="stars-row">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < num ? "star-filled" : "star-empty"} 
                          fill={i < num ? "#FFC107" : "transparent"} 
                          color={i < num ? "#FFC107" : "#ddd"} 
                        />
                      ))}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
        </aside>

        {/* Right Product Grid */}
        <main className="shop-products-area">
          <div className="products-top-bar">
            <p className="results-count">{products.length} products found</p>
            <div className="sort-view-controls">
              <div className="sort-dropdown">
                <span>Sort</span>
                <ChevronDown size={16} />
              </div>
              <div className="view-icons">
                <SlidersHorizontal size={18} className="view-icon" />
                <Grid size={18} className="view-icon active" />
              </div>
            </div>
          </div>

          <div className="products-grid-new">
            {products.map((product, index) => (
              <motion.div 
                key={product.id} 
                className="tour-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link to={`/product/${product.id}`} className="tour-card-img-link">
                  <div className="tour-card-img-wrapper">
                    <img src={product.image} alt={product.name} />
                    <div className="badge-featured">Featured</div>
                    <button className="btn-heart" onClick={(e) => e.preventDefault()}>
                      <Heart size={18} />
                    </button>
                    {/* The avatar floating circle from the screenshot */}
                    <div className="tour-avatar" onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}>
                      <img src="/hero.png" alt="Add" className="add-icon" />
                    </div>
                  </div>
                </Link>
                
                <div className="tour-card-content">
                  <Link to={`/product/${product.id}`} style={{textDecoration:'none'}}>
                    <h3 className="tour-title">{product.name}</h3>
                  </Link>
                  <div className="tour-rating">
                    <Star size={12} fill="#FFC107" color="#FFC107" />
                    <span className="rating-score">5</span>
                    <span className="rating-count">(5 Reviews)</span>
                  </div>
                  
                  <div className="tour-card-footer">
                    <div className="tour-price">
                      <span className="price-label">From</span>
                      <span className="price-value">₹{product.price.toLocaleString()}</span>
                    </div>
                    <div className="tour-duration">
                      <Calendar size={12} />
                      <span>{product.category}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
}
