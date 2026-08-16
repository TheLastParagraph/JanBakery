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
        setDimensions({ width: 360, height: 540 });
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
  // Build flat array of pages to satisfy react-pageflip's strict children requirements
  const flipbookPages = [];
  
  // 1. Front Cover
  flipbookPages.push(
    <div key="front-cover" className="menu-page cover-page" data-density="hard">
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
  );

  // 2. Category Pages
  categories.forEach((cat, index) => {
    flipbookPages.push(
      <Page key={cat} number={index + 1} category={cat} items={groupedProducts[cat]} />
    );
  });

  // 3. Blank Page (if needed to make total pages even)
  if (categories.length % 2 !== 0) {
    flipbookPages.push(
      <Page key="blank" number={categories.length + 1} category="" items={[]} />
    );
  }

  // 4. Back Cover
  flipbookPages.push(
    <div key="back-cover" className="menu-page cover-page back-cover" data-density="hard">
      <div className="cover-content">
        <div className="cover-border">
          <h3 className="back-thanks">Thank You</h3>
          <p className="back-sub">We hope you enjoyed our menu.</p>
        </div>
      </div>
    </div>
  );

  const [dimensions, setDimensions] = useState({
    width: 360,
    height: 540
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Miniature 2-page spread for mobile
        const availableWidth = window.innerWidth - 30; // 15px padding on each side
        const pageW = availableWidth / 2;
        setDimensions({ width: pageW, height: pageW * 1.45 });
      } else {
        // Desktop 2-page spread
        setDimensions({ width: 360, height: 540 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [bookState, setBookState] = useState('cover'); // 'cover', 'open', 'backCover'

  const onFlip = (e) => {
    const pageIndex = e.data;
    if (pageIndex === 0) {
      setBookState('cover');
    } else if (pageIndex >= flipbookPages.length - 1) {
      setBookState('backCover');
    } else {
      setBookState('open');
    }
  };

  const getBookStyle = () => {
    const baseStyle = { 
      width: dimensions.width * 2, 
      height: dimensions.height,
      transition: 'transform 0.6s ease-in-out, clip-path 0.6s ease-in-out'
    };
    
    if (bookState === 'cover') {
      return {
        ...baseStyle,
        transform: 'translateX(-25%)',
        clipPath: 'inset(0 0 0 50%)'
      };
    } else if (bookState === 'backCover') {
      return {
        ...baseStyle,
        transform: 'translateX(25%)',
        clipPath: 'inset(0 50% 0 0)'
      };
    }
    
    return {
      ...baseStyle,
      transform: 'translateX(0)',
      clipPath: 'inset(0 0 0 0)'
    };
  };

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
        
        <div className="book-container" style={getBookStyle()}>
          <HTMLFlipBook 
            key={`${dimensions.width}-${dimensions.height}`}
            width={dimensions.width} 
            height={dimensions.height}
            size="fixed"
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={onFlip}
            className="menu-flipbook"
          >
            {flipbookPages}
          </HTMLFlipBook>
        </div>
      </div>
    </motion.div>
  );
}
