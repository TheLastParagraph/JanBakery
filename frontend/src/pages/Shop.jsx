import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { 
  Search, MapPin, Calendar, Heart, Star, 
  ChevronDown, Grid, List, SlidersHorizontal 
} from 'lucide-react';
import './Shop.css';

export default function Shop() {
  const { addToCart } = useCart();
  const location = useLocation();
  const [view, setView] = useState('grid');
  const [priceRange, setPriceRange] = useState(2500);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState('new');
  const [localSearch, setLocalSearch] = useState('');

  // Sync search state with URL when navigating from navbar search
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search');
    if (q) setLocalSearch(q);
  }, [location.search]);

  // Filter products based on price and search term
  const filteredProducts = products.filter(product => {
    const matchesPrice = product.price <= priceRange;
    const searchLower = localSearch.toLowerCase();
    const matchesSearch = !searchLower || 
                          product.name.toLowerCase().includes(searchLower) || 
                          product.category.toLowerCase().includes(searchLower) ||
                          product.description.toLowerCase().includes(searchLower);
    return matchesPrice && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortOption) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'name-asc': return a.name.localeCompare(b.name);
      case 'name-desc': return b.name.localeCompare(a.name);
      default: return 0; // 'new' keeps default order
    }
  });

  return (
    <motion.div 
      className="shop-template-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 1. TOP BANNER & SEARCH OVERLAY */}
      <motion.div 
        className="shop-banner-container"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="shop-banner-bg"></div>
        
        {/* Floating Search Pill */}
        <motion.div 
          className="search-pill-container"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div className="search-pill">
            <div className="search-field">
              <MapPin size={20} className="field-icon" />
              <div className="field-text">
                <span className="field-label">Search</span>
                <input 
                  type="text" 
                  placeholder="What are you craving?" 
                  className="field-input" 
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                />
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
        </motion.div>
      </motion.div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="shop-main-layout container">
        
        {/* Left Sidebar */}
        <motion.aside 
          className="shop-sidebar"
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          
          <div className="filter-box">
            <div className="filter-header">
              <h3>Filter Price</h3>
              <ChevronDown size={18} />
            </div>
            <div className="filter-content">
              <div className="range-slider-container">
                <input 
                  type="range" 
                  min="0" 
                  max="3000" 
                  value={priceRange} 
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="price-range-slider"
                />
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
                <button className="btn-clear" onClick={() => setPriceRange(3000)}>Clear</button>
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
          
        </motion.aside>

        {/* Right Product Grid */}
        <main className="shop-products-area">
          <motion.div 
            className="products-top-bar"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="results-count">{sortedProducts.length} products found</p>
            <div className="sort-view-controls">
              
              <div className="sort-dropdown-container">
                <div className="sort-dropdown" onClick={() => setIsSortOpen(!isSortOpen)}>
                  <span>Sort</span>
                  <ChevronDown size={16} />
                </div>
                
                {isSortOpen && (
                  <div className="sort-popup">
                    <label className="sort-option">
                      <input type="radio" name="sort" checked={sortOption === 'new'} onChange={() => { setSortOption('new'); setIsSortOpen(false); }} />
                      <span>New Product</span>
                    </label>
                    
                    <div className="sort-group-label">Price</div>
                    <label className="sort-option">
                      <input type="radio" name="sort" checked={sortOption === 'price-asc'} onChange={() => { setSortOption('price-asc'); setIsSortOpen(false); }} />
                      <span>Low to High</span>
                    </label>
                    <label className="sort-option">
                      <input type="radio" name="sort" checked={sortOption === 'price-desc'} onChange={() => { setSortOption('price-desc'); setIsSortOpen(false); }} />
                      <span>High to Low</span>
                    </label>
                    
                    <div className="sort-group-label">Name</div>
                    <label className="sort-option">
                      <input type="radio" name="sort" checked={sortOption === 'name-asc'} onChange={() => { setSortOption('name-asc'); setIsSortOpen(false); }} />
                      <span>a - z</span>
                    </label>
                    <label className="sort-option">
                      <input type="radio" name="sort" checked={sortOption === 'name-desc'} onChange={() => { setSortOption('name-desc'); setIsSortOpen(false); }} />
                      <span>z - a</span>
                    </label>
                  </div>
                )}
              </div>
              <div className="view-icons">
                <SlidersHorizontal size={18} className="view-icon" />
                <Grid size={18} className="view-icon active" />
              </div>
            </div>
          </motion.div>

          <div className="products-grid-new">
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product.id} 
                className="tour-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
    </motion.div>
  );
}
