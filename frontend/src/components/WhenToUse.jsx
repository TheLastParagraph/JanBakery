import React from 'react';
import { motion } from 'framer-motion';
import { Cake, Coffee, Utensils, ShoppingBag } from 'lucide-react';
import './WhenToUse.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { scale: 0.8, opacity: 0, y: 50 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  }
};

export default function WhenToUse() {
  const cards = [
    { icon: <Cake size={32} strokeWidth={1.5} />, title: "Fresh Bakery", desc: "Delightful cakes, breads, and baked goods every day." },
    { icon: <Coffee size={32} strokeWidth={1.5} />, title: "Cozy Café", desc: "Enjoy our warm beverages in a welcoming atmosphere." },
    { icon: <Utensils size={32} strokeWidth={1.5} />, title: "Confectionery", desc: "Sweet treats and candies to satisfy every craving." },
    { icon: <ShoppingBag size={32} strokeWidth={1.5} />, title: "Takeaway", desc: "Grab your favorites to go. Quick and convenient." },
  ];

  return (
    <section className="when-to-use container" id="products">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Our Offerings</h2>
        <p className="section-subtitle">
          From freshly baked bread to sweet confectionery, everything we make at Jan Bakery is crafted with passion and quality ingredients.
        </p>
      </motion.div>

      <motion.div 
        className="cards-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {cards.map((card, index) => (
          <motion.div key={index} className="use-card" variants={cardVariants}>
            <div className="icon-wrapper">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="order-btn-wrapper"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <a 
          href="https://www.google.com/maps/search/?api=1&query=Jan+Bakery%2C+Magam%2C+Jammu+and+Kashmir&utm_source=janbakery.isbest.org" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-black" 
          style={{ display: 'inline-block', textDecoration: 'none' }}
        >
          Visit Us Today &rarr;
        </a>
      </motion.div>
    </section>
  );
}
