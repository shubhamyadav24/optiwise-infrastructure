import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import "./testimonials.css";

const Stars = ({ rating = 5 }) => (
  <div
    className="testimonial-card__stars"
    aria-label={`${rating} out of 5 stars`}
  >
    {Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={i < rating ? "is-filled" : ""}
      >
        ★
      </span>
    ))}
  </div>
);

const TestimonialsSection = () => {
  const [clients, setClients] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    api
      .get("/clients")
      .then((res) => {
        setClients(res.data || []);
      })
      .catch(() => {
        setClients([]);
      });
  }, []);

  // Auto slide
  useEffect(() => {
    if (clients.length <= 2) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % clients.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [clients.length]);

  if (!clients.length) return null;

  const visibleClients = [
    clients[current % clients.length],
    clients[(current + 1) % clients.length],
  ];

  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">

        <div className="section-head">
          <span className="eyebrow">Client Feedback</span>
          <h2>What people we've built for say</h2>
        </div>

        <div className="testimonials__grid">
          {visibleClients.map((client, index) => (
            <motion.div
              key={`${client._id || client.name}-${current}-${index}`}
              className="testimonial-card"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.04,
                ease: "easeOut",
              }}
            >
              <Stars rating={client.rating} />

              <p className="testimonial-card__text">
                &ldquo;{client.testimonial}&rdquo;
              </p>

              <div className="testimonial-card__foot">
                <span className="testimonial-card__name">
                  {client.name}
                </span>

                {client.location && (
                  <span className="coord-tag">
                    {client.location}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {clients.length > 2 && (
          <div className="testimonials__dots">
            {clients.map((client, index) => (
              <button
                key={client._id || index}
                type="button"
                className={index === current ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrent(index);
                }}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default TestimonialsSection;