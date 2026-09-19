import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "./hero.css";

import hero1 from "../assets/hero_image_1.webp";
import hero2 from "../assets/hero_image_2.webp";
import hero3 from "../assets/hero_image_3.webp";
import hero4 from "../assets/hero_image_4.webp";

const slides = [
  {
    title: "We plan it, design it, and build it.",
    description:
      "Complete infrastructure solutions for residential, commercial and farmhouse projects — from the first site visit to final handover.",
    image: hero1,
    button: "Get a Free Site Visit",
    link: "/contact",
  },
  {
    title: "Professional 2D & 3D Building Planning",
    description:
      "Create practical floor plans and realistic 3D elevations before construction begins.",
    image: hero2,
    button: "Explore Planning",
    link: "/services",
  },
  {
    title: "Accurate TS/DGPS Land Surveying",
    description:
      "Precision surveying and site measurements for reliable construction and development planning.",
    image: hero3,
    button: "Book a Site Survey",
    link: "/contact",
  },
  {
    title: "Modern Interior & Exterior Design",
    description:
      "Functional and attractive spaces designed according to your lifestyle, requirements and budget.",
    image: hero4,
    button: "View Our Projects",
    link: "/projects",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section className="hero">

      {/* BACKGROUND IMAGE */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="hero__background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            backgroundImage: `url(${slide.image})`,
          }}
        />
      </AnimatePresence>

      {/* DARK OVERLAY */}
      <div className="hero__overlay"></div>

      {/* CONTENT */}
      <div className="hero__container">

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >

            <span className="hero__eyebrow">
              OPTIWISE INFRASTRUCTURE
            </span>

            <h1>
              {slide.title}
            </h1>

            <p>
              {slide.description}
            </p>

            <Link
              to={slide.link}
              className="hero__button"
            >
              {slide.button}
            </Link>

          </motion.div>
        </AnimatePresence>

        {/* SLIDER DOTS */}
        <div className="hero__dots">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={index === current ? "active" : ""}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>

    </section>
  );
};

export default Hero;