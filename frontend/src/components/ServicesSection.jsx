import { motion } from "framer-motion";
import "./services.css";

import planningImg from "../assets/service-planning.jpg";
import constructionImg from "../assets/service-construction.jpg";
import interiorImg from "../assets/service-interior.jpg";
import consultancyImg from "../assets/service-consultancy.jpg";
import surveyImg from "../assets/service-survey.jpg";

export const SERVICES = [
  {
    code: "A",
    title: "2D Planning & 3D Elevation",
    desc: "Realistic floor plans and elevation designs so you can see the home before a single brick is laid.",
    image: planningImg,
  },
  {
    code: "B",
    title: "Contractor & Builder",
    desc: "Full residential and commercial construction, managed on-site from foundation to finishing.",
    image: constructionImg,
  },
  {
    code: "C",
    title: "Interior & Exterior Design",
    desc: "Modern, budget-friendly interiors and facades tailored to how you actually want to live or work.",
    image: interiorImg,
  },
  {
    code: "D",
    title: "Project Consultancy",
    desc: "End-to-end guidance on approvals, budgeting and sequencing, whether we build it or you do.",
    image: consultancyImg,
  },
  {
    code: "E",
    title: "TS & DGPS Survey",
    desc: "Accurate, professional land survey using Total Station and DGPS equipment for plots of any size.",
    image: surveyImg,
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const ServicesSection = () => {
  return (
    <section className="section services" id="services">

      <div className="container">

        <div className="section-head">
          <span className="eyebrow">
            What We Do
          </span>

          <h2>
            Five services. One point of contact.
          </h2>
        </div>

        <div className="services__grid">

          {SERVICES.map((s, i) => (

            <motion.div
              className="service-card"
              key={s.code}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              style={{
                backgroundImage: `url(${s.image})`,
              }}
            >

              {/* IMAGE OVERLAY */}
              <div className="service-card__overlay"></div>

              {/* CONTENT */}
              <div className="service-card__content">

                <span className="service-card__code mono">
                  {s.code}
                </span>

                <h3>
                  {s.title}
                </h3>

                <p>
                  {s.desc}
                </p>

                <span className="service-card__arrow">
                  →
                </span>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default ServicesSection;