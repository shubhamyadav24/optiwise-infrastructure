import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const VALUES = [
  { title: 'Precision', detail: 'Every project starts with an accurate TS/DGPS survey — measurements you can trust before a single design decision is made.' },
  { title: 'Transparency', detail: 'Written plans and estimates before work begins, so there are no surprises mid-project.' },
  { title: 'Craftsmanship', detail: 'From structure to finish, work is checked at each stage rather than only at the end.' },
  { title: 'Accountability', detail: 'One team responsible for the whole project — design, survey and construction — with a direct line to the people doing the work.' }
];

const About = () => {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Built by people who measure twice."
        lede="Optiwise Infrastructure is an Indore-based team offering planning, design, survey and construction services for residential, commercial and farmhouse projects."
      />

      <section className="section" style={{ background: 'var(--offwhite)' }}>
        <div className="container about__story">
          <div className="section-head">
            <span className="eyebrow">Our Approach</span>
            <h2>Creating value. Crafting excellence.</h2>
          </div>
          <p className="about__p">
            We started Optiwise Infrastructure to close a common gap in construction
            projects — the handoff between the person who surveys the land, the
            person who designs the building, and the person who builds it. By
            handling 2D planning, 3D elevation, TS &amp; DGPS surveying, interior
            &amp; exterior design, and on-site construction ourselves, we keep that
            information intact from the first site visit to handover.
          </p>
          <p className="about__p">
            Whether it's a family home, a commercial space, or a farmhouse, we work
            with your budget and your land, and give you a clear plan before we
            ask you to commit to anything.
          </p>
        </div>
      </section>

      <section className="section grid-paper" style={{ background: 'var(--paper-soft)' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What We Value</span>
            <h2>How we work</h2>
          </div>
          <div className="services__grid">
            {VALUES.map((v, i) => (
              <motion.div
                className="service-card"
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
              >
                <h3>{v.title}</h3>
                <p>{v.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container cta-band__inner">
          <h2>Want to see the sites we've completed?</h2>
          <Link to="/projects" className="btn btn-primary">View Projects</Link>
        </div>
      </section>
    </>
  );
};

export default About;
