import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const TypewriterText = ({ text, className }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      transition: { duration: 0.1 }
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ display: "inline-block", marginRight: "0.25em" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function About() {
  return (
    <motion.div 
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="about-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="about-title">About Jan Bakery</h1>
        <p className="about-subtitle">
          "Serving freshly baked products to the Magam community."
        </p>
      </motion.div>

      <div className="about-card-container">
        <motion.div 
          className="about-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="about-card-title">Our Story</h2>
          <TypewriterText 
            text="Located in the heart of Agrikalan, Magam, Jan Bakery has been a staple for locals and travelers alike. We pride ourselves on creating high-quality, freshly baked goods every single day."
            className="about-paragraph"
          />
          <div style={{ height: '1.5rem' }}></div>
          <TypewriterText 
            text="Whether you are looking for traditional Kashmiri breads for your morning tea, a custom-designed cake for a special celebration, or a hot evening snack of Tandoori Chicken and Biryani, we have something to delight your taste buds."
            className="about-paragraph"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
