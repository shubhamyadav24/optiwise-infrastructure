import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ServicesSection, { SERVICES } from '../components/ServicesSection';
import WhyUs from '../components/WhyUs';
import PageHeader from '../components/PageHeader';

const Services = () => {
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        title="Every stage of building, under one roof"
        lede="From the first sketch to the final coat of paint — plan, survey, design and build with a single accountable team."
      />
      <ServicesSection />

      <section className="section" style={{ background: 'var(--offwhite)' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Process</span>
            <h2>How a project moves from plot to handover</h2>
          </div>
          <div className="process-list">
            {[
              { step: 'Site Visit & Survey', detail: 'TS/DGPS survey of your plot to get accurate boundaries and levels before anything is drawn.' },
              { step: '2D Plan & 3D Elevation', detail: 'A realistic plan and elevation you can review and revise before construction starts.' },
              { step: 'Estimate & Consultancy', detail: 'A written estimate against the approved plan, plus guidance on approvals and sequencing.' },
              { step: 'Construction', detail: 'On-site contracting and building management for residential, commercial or farmhouse projects.' },
              { step: 'Interior & Exterior', detail: 'Modern, budget-friendly interior and facade work to finish the space.' },
              { step: 'Handover & Support', detail: 'Final walkthrough, documentation, and support after you move in.' }
            ].map((p, i) => (
              <motion.div
                className="process-item"
                key={p.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <span className="mono process-item__num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{p.step}</h3>
                  <p>{p.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WhyUs />

      <section className="section cta-band">
        <div className="container cta-band__inner">
          <h2>Have a plot and an idea? Let's put it on paper.</h2>
          <Link to="/contact" className="btn btn-primary">Talk to Us</Link>
        </div>
      </section>
    </>
  );
};

export default Services;
