import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axios';
import './testimonials.css';

const Stars = ({ rating = 5 }) => (
  <div className="testimonial-card__stars" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < rating ? 'is-filled' : ''}>★</span>
    ))}
  </div>
);

const TestimonialsSection = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    api
      .get('/clients')
      .then((res) => setClients(res.data.slice(0, 6)))
      .catch(() => setClients([]));
  }, []);

  if (!clients.length) return null;

  return (
    <section className="section testimonials grid-paper" id="testimonials">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Client Feedback</span>
          <h2>What people we've built for say</h2>
        </div>

        <div className="testimonials__grid">
          {clients.map((c, i) => (
            <motion.div
              className="testimonial-card"
              key={c._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
            >
              <Stars rating={c.rating} />
              <p className="testimonial-card__text">&ldquo;{c.testimonial}&rdquo;</p>
              <div className="testimonial-card__foot">
                <span className="testimonial-card__name">{c.name}</span>
                {c.location && <span className="coord-tag">{c.location}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
