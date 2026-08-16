import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './FAQ.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "1. Where are you located?",
      a: "We are located at Kalan Complex on Magam-Beerwah/Gulmarg Road, near the Indian Oil Petrol Pump in Agrikalan/Badran, Magam."
    },
    {
      q: "2. What are your opening hours?",
      a: "We are open daily from 9:30 AM to 9:30 PM. Come visit us for fresh baked goods!"
    },
    {
      q: "3. Do you offer takeaway?",
      a: "Yes, we offer convenient takeaway for all our bakery, café, and confectionery items."
    },
    {
      q: "4. What kind of products do you sell?",
      a: "We are a full-service Bakery and Café. We sell a variety of fresh breads, cakes, sweet treats, and café beverages."
    }
  ];

  return (
    <section className="faq container">
      <motion.div 
        className="faq-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">FAQ's</h2>
        <p className="section-subtitle">Got questions? We've got answers.</p>
      </motion.div>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <motion.div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'active' : ''}`}
            onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
          >
            <div className="faq-question">
              <h3>{faq.q}</h3>
              <span className="faq-icon">{openIndex === index ? 'v' : '>'}</span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
