import { motion } from "framer-motion";
import "./whyus.css";

import whyUsImage from "../assets/why-us.jpg";

const ROWS = [
  {
    number: "01",
    title: "One Point of Contact",
    text: "Instead of coordinating separately with an architect, surveyor and contractor, you can work with one team. Optiwise Infrastructure brings planning, surveying, design and construction services together so your project can move from the initial idea to execution with better coordination.",
  },
  {
    number: "02",
    title: "Design Before Construction",
    text: "We believe the design should be clear before construction begins. Our 2D planning and 3D elevation services help you understand the layout, spaces, proportions and exterior appearance of your project before work starts on site.",
  },
  {
    number: "03",
    title: "Accurate Land Survey",
    text: "Good construction starts with accurate site information. Our Total Station and DGPS surveying services help establish reliable measurements, boundaries, levels and site data required for planning and execution.",
  },
 
];

const WhyUs = () => {
  return (
    <section className="whyus" id="why-us">
      <div className="container">

        {/* HEADER */}

        <div className="whyus__header">
          <span className="eyebrow">Why Optiwise</span>

          <h2>
            Built around your
            <span> complete vision.</span>
          </h2>

          <p>
            From land measurement and planning to construction and finishing,
            we bring the important parts of your project together under one
            coordinated team.
          </p>
        </div>

        {/* MAIN CONTENT */}

        <div className="whyus__main">

          {/* IMAGE */}

          <motion.div
            className="whyus__image"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={whyUsImage}
              alt="Optiwise Infrastructure construction project"
            />

            <div className="whyus__image-overlay">
              <span>OPTIWISE</span>
              <strong>INFRASTRUCTURE</strong>
            </div>

            <div className="whyus__image-number">
              01
            </div>
          </motion.div>

          {/* CONTENT */}

          <div className="whyus__content">

            <div className="whyus__intro">
              <span className="whyus__label">
                OUR APPROACH
              </span>

              <p>
                Every construction project has different requirements. Our
                approach is to understand the site, establish the right
                design, plan the work and then execute it with attention to
                quality and coordination. This helps reduce unnecessary
                confusion between different stages of a project.
              </p>
            </div>

            {/* DETAILS */}

            <div className="whyus__details">

              {ROWS.map((item, index) => (
                <motion.article
                  className="whyus__detail"
                  key={item.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.07,
                  }}
                >
                  <div className="whyus__detail-number">
                    {item.number}
                  </div>

                  <div>
                    <h3>{item.title}</h3>

                    <p>{item.text}</p>
                  </div>
                </motion.article>
              ))}

            </div>

          </div>
        </div>

        {/* BOTTOM STATEMENT */}

       

      </div>
    </section>
  );
};

export default WhyUs;