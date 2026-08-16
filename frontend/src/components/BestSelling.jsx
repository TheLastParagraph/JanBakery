import React from 'react';
import { motion } from 'framer-motion';
import './BestSelling.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { scale: 1.2, opacity: 0, x: -50 }, // zoom out effect + slide
  visible: { 
    scale: 1, 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function BestSelling() {
  const products = [
    {
      title: "FRESH BAKED BREAD",
      desc: "Soft, warm, and baked fresh every single morning to start your day right.",
      bgClass: "bg-blue"
    },
    {
      title: "SIGNATURE PASTRIES",
      desc: "A sweet treat perfectly paired with our cozy cafe beverages.",
      bgClass: "bg-yellow"
    },
    {
      title: "CUSTOM CAKES",
      desc: "Beautiful, delicious cakes made to order for any family celebration.",
      bgClass: "bg-pink"
    }
  ];

  return (
    <section className="best-selling container">
      <motion.div 
        className="best-selling-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Bakery Highlights</h2>
        <p className="section-subtitle">
          Discover our customers' absolute favorites, from savory snacks to sweet treats baked fresh daily.
        </p>
      </motion.div>

      <motion.div 
        className="product-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {products.map((prod, index) => (
          <motion.div key={index} className="product-card" variants={cardVariants}>
            <div className={`product-img-wrapper ${prod.bgClass}`}>
              <img src="/hero-product.jpg" alt={prod.title} className="product-img" />
            </div>
            <h3 className="product-title">{prod.title}</h3>
            <p className="product-desc">{prod.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="view-more-wrapper"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <button className="btn-black">View More</button>
      </motion.div>
    </section>
  );
}
