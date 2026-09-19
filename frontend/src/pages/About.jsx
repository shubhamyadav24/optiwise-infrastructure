import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import "./about.css";

import aboutImage from "../assets/about-infrastructure.png";

const VALUES = [
  {
    number: "01",
    title: "Precision",
    detail:
      "Every project begins with accurate site information. Our TS and DGPS surveying services help establish reliable measurements, boundaries and levels before important design and construction decisions are made.",
  },
  {
    number: "02",
    title: "Transparency",
    detail:
      "We believe clients should understand the project before committing to it. Plans, requirements and estimated costs are discussed clearly so the project starts with a practical understanding of what needs to be done.",
  },
  {
    number: "03",
    title: "Craftsmanship",
    detail:
      "Good construction is built through attention to detail at every stage. From structural work to finishing, we focus on proper execution, coordination and quality rather than leaving everything to the final inspection.",
  },
  {
    number: "04",
    title: "Accountability",
    detail:
      "With planning, surveying, design and construction connected through one team, communication becomes simpler. You have a direct point of contact throughout the project instead of managing multiple disconnected teams.",
  },
];

const PROCESS = [
  {
    number: "01",
    title: "Understand",
    text: "We begin by understanding your land, requirements, budget and intended use of the project.",
  },
  {
    number: "02",
    title: "Measure",
    text: "Site measurements and surveying provide the information required to make informed planning decisions.",
  },
  {
    number: "03",
    title: "Design",
    text: "2D planning, elevation and design development turn your requirements into a clear project vision.",
  },
  {
    number: "04",
    title: "Build",
    text: "Once the plan is established, our construction team works towards executing the project with coordinated supervision.",
  },
];

const About = () => {
  return (
    <>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <PageHeader
        eyebrow="About Optiwise"
        title="We believe good construction starts before the first brick."
        lede="Optiwise Infrastructure is an Indore-based team providing planning, surveying, design and construction services for residential, commercial and farmhouse projects."
      />

      {/* =====================================================
          OUR STORY
      ===================================================== */}

      <section className="about-story">
        <div className="container">

          <div className="about-story__grid">

            {/* IMAGE */}

            <motion.div
              className="about-story__image"
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
            >
              <img
                src={aboutImage}
                alt="Optiwise Infrastructure construction project"
              />

              <div className="about-story__image-label">
                <span>OPTIWISE</span>
                <strong>INFRASTRUCTURE</strong>
              </div>

              <div className="about-story__image-number">
                01
              </div>
            </motion.div>

            {/* CONTENT */}

            <motion.div
              className="about-story__content"
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
            >
              <span className="eyebrow">
                Our Approach
              </span>

              <h2>
                From land
                <br />
                <span>to reality.</span>
              </h2>

              <p>
                We started Optiwise Infrastructure with a simple idea:
                construction becomes easier when the important stages are
                connected from the beginning.
              </p>

              <p>
                A project may involve surveying the land, preparing the plan,
                developing the elevation, estimating the work, coordinating
                materials and finally executing the construction. When these
                stages are handled separately, important information can get
                lost between teams.
              </p>

              <p>
                Our approach is to bring these services together. From
                TS/DGPS surveying and 2D planning to 3D elevation, interior
                and exterior design and construction, we work towards keeping
                the project coordinated from the first site visit to
                completion.
              </p>

              <div className="about-story__highlight">
                <span>OUR PRINCIPLE</span>
                <strong>
                  Measure carefully. Plan clearly. Build properly.
                </strong>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* =====================================================
          VALUES
      ===================================================== */}

<section className="about-values">
  <div className="container">

    <div className="about-values__heading">
      <div>
        <span className="eyebrow">What We Value</span>
        <h2>
          The way we <span>work.</span>
        </h2>
      </div>

      <p>
        Our approach is built around accurate planning, clear communication,
        quality execution and responsibility throughout the project.
      </p>
    </div>

    <div className="about-values__grid">

      {VALUES.map((value, index) => (
        <motion.div
          className="about-value"
          key={value.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.4,
            delay: index * 0.07,
          }}
        >
          <div className="about-value__top">
            <span className="about-value__number">
              0{index + 1}
            </span>

            <span className="about-value__symbol">
              +
            </span>
          </div>

          <h3>{value.title}</h3>

          <p>{value.detail}</p>

          <div className="about-value__bottom">
            <span>OPTIWISE INFRASTRUCTURE</span>
          </div>
        </motion.div>
      ))}

    </div>

  </div>
</section>

      {/* =====================================================
          PROCESS
      ===================================================== */}

      <section className="about-process">
        <div className="container">

          <div className="about-process__header">
            <span className="eyebrow">
              Our Process
            </span>

            <h2>
              A clear path from
              <span> idea to execution.</span>
            </h2>
          </div>

          <div className="about-process__list">

            {PROCESS.map((item, index) => (
              <motion.div
                className="about-process__item"
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
              >
                <div className="about-process__number">
                  {item.number}
                </div>

                <div className="about-process__title">
                  <h3>{item.title}</h3>
                </div>

                <p>{item.text}</p>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="about-cta">
        <div className="container">

          <div className="about-cta__inner">

            <div>
              {/* <span className="eyebrow">
                Start Your Project
              </span> */}

              <h2>
                Have a plot?
                <br />
                <span>Let's plan it properly.</span>
              </h2>
            </div>

            <div className="about-cta__right">
              <p>
                Tell us about your land, requirements and project goals.
                Our team can help you understand the next steps.
              </p>

              <div className="about-cta__buttons">
                <Link
                  to="/contact"
                  className="btn btn-primary"
                >
                  Talk To Us
                </Link>

                <Link
                  to="/projects"
                  className="about-cta__link"
                >
                  View Projects →
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default About;