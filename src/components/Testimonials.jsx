import React from 'react';
import { motion } from 'framer-motion';
import './Testimonials.css';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Mahreen Majied",
      quote: "Highly recommended this beautiful place.",
      img: "https://randomuser.me/api/portraits/women/47.jpg"
    },
    {
      name: "Tariq A.",
      quote: "The best bakery in Magam. Their cakes and pastries are always perfect for our family celebrations.",
      img: "https://randomuser.me/api/portraits/men/11.jpg"
    }
  ];

  return (
    <section className="testimonials container" id="reviews">
      <div className="test-header">
        <h2 className="section-title">What Our Happy Client Say.</h2>
        <p className="section-subtitle">
          Recommendations from satisfied buyers that affirm the value of our bakery.
        </p>
      </div>

      <div className="test-wrapper">
        <div className="test-cards-container">
          {testimonials.map((test, index) => (
            <motion.div 
              key={index} 
              className="test-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="test-author">
                <img src={test.img} alt={test.name} className="author-img" />
                <h4 className="author-name">{test.name}</h4>
              </div>
              <div className="test-content">
                <span className="quote-mark">“</span>
                <p>{test.quote}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="test-nav">
          <button className="nav-arrow">&larr;</button>
          <button className="nav-arrow active">&rarr;</button>
        </div>
      </div>
    </section>
  );
}
