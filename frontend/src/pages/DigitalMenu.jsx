import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import './DigitalMenu.css';

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="menu-page" ref={ref} data-density="soft">
      <div className="page-content">
        <div className="page-header">
          <h2>{props.category}</h2>
          <div className="page-ornament"></div>
        </div>
        <div className="page-items">
          {props.items.map(item => (
            <div key={item.id} className="menu-item-row">
              <div className="item-details">
                <h4 className="item-name">{item.name}</h4>
                <p className="item-desc">{item.description}</p>
              </div>
              <div className="item-price">₹{item.price}</div>
            </div>
          ))}
        </div>
        <div className="page-footer">- {props.number} -</div>
      </div>
    </div>
  );
});

export default function DigitalMenu() {
  const [dimensions, setDimensions] = useState({
    width: 450,
    height: 650
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Calculate width to fit two pages side-by-side on mobile screens
        const availableWidth = window.innerWidth - 40; // 20px padding on each side
        const pageW = availableWidth / 2;
        setDimensions({ width: pageW, height: pageW * 1.5 });
      } else {
        setDimensions({ width: 260, height: 390 });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  const categories = Object.keys(groupedProducts);
  const isOddPages = (2 + categories.length) % 2 !== 0;

  return (
    <motion.div 
      className="digital-menu-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flipbook-wrapper">
        <h1 className="digital-menu-title">Digital Menu Book</h1>
        <p className="digital-menu-subtitle">Drag the page corners or click to flip the pages</p>
        
        <div className="book-container">
          <HTMLFlipBook 
            key={`${dimensions.width}-${dimensions.height}`}
            width={dimensions.width} 
            height={dimensions.height}
            size="fixed"
            usePortrait={false}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className="menu-flipbook"
          >
            {/* Cover */}
            <div className="menu-page cover-page" data-density="hard">
              <div className="cover-content">
                <div className="cover-border">
                  <h1 className="cover-title">Jan Bakery</h1>
                  <div className="cover-divider"></div>
                  <p className="cover-est">EST. 1999</p>
                  <h2 className="cover-menu-text">MENU</h2>
                  <p className="cover-address">Kalan Complex, Magam<br/>Gulmarg Road</p>
                </div>
              </div>
            </div>
            
            {/* Inner Pages */}
            {categories.map((cat, index) => (
              <Page key={cat} number={index + 1} category={cat} items={groupedProducts[cat]} />
            ))}

            {isOddPages && (
              <div className="menu-page blank-page" data-density="soft">
                <div className="page-content">
                  <div className="page-footer">- {categories.length + 1} -</div>
                </div>
              </div>
            )}

            {/* Back Cover */}
            <div className="menu-page cover-page back-cover" data-density="hard">
              <div className="cover-content">
                <div className="cover-border">
                  <h3 className="back-thanks">Thank You</h3>
                  <p className="back-sub">We hope you enjoyed our menu.</p>
                </div>
              </div>
            </div>
          </HTMLFlipBook>
        </div>
      </div>
    </motion.div>
  );
}
