import React from 'react';
import { motion } from 'framer-motion';
import './ContactUs.css';

export default function ContactUs() {
  return (
    <section className="contact-us container">
      <motion.div 
        className="contact-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Contact Us</h2>
        <p className="section-subtitle">
          Have a question about our baked goods or want to place a large order? Reach out to us below.
        </p>
      </motion.div>

      <div className="contact-wrapper">
        <motion.form 
          className="contact-form"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <input type="text" placeholder="Name*" required />
          <input type="email" placeholder="Email*" required />
          <input type="text" placeholder="Phone*" required />
          <textarea placeholder="Message" rows="5"></textarea>
          <button type="submit" className="submit-btn">Submit</button>
        </motion.form>

        <motion.div 
          className="contact-image-wrapper"
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <img src="/hero-product.jpg" alt="Holding Keto Bar" className="contact-img" />
        </motion.div>
      </div>
    </section>
  );
}
