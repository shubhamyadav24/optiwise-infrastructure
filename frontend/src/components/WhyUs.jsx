import { motion } from 'framer-motion';
import './whyus.css';

const ROWS = [
  {
    label: 'Point of contact',
    typical: 'Separate architect, contractor and surveyor — you coordinate between them',
    optiwise: 'One team for design, survey and construction, start to finish'
  },
  {
    label: 'Design before you build',
    typical: 'Often skipped or charged as a large separate fee',
    optiwise: '2D plan + realistic 3D elevation included in project consultancy'
  },
  {
    label: 'Land survey',
    typical: 'Basic manual measurement, prone to boundary disputes later',
    optiwise: 'TS & DGPS survey for accurate, defensible boundary and level data'
  },
  {
    label: 'Cost visibility',
    typical: 'Verbal estimates, revised mid-project',
    optiwise: 'Written estimate against your plan before work starts'
  },
  {
    label: 'After handover',
    typical: 'Contractor moves to the next site immediately',
    optiwise: 'Reachable for post-handover queries and minor fixes'
  }
];

const WhyUs = () => {
  return (
    <section className="section whyus grid-paper" id="why-us">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Why Optiwise</span>
          <h2>How we compare to a typical build in Indore</h2>
          <p className="whyus__note">
            General patterns we see across the industry, not a claim about any one
            company. Every project is different — talk to us for a quote specific
            to your plot and requirements.
          </p>
        </div>

        <div className="whyus__table" role="table" aria-label="Comparison with a typical construction process">
          <div className="whyus__row whyus__row--head" role="row">
            <div role="columnheader"></div>
            <div role="columnheader" className="mono">Typical approach</div>
            <div role="columnheader" className="mono whyus__col--optiwise-head">Optiwise Infrastructure</div>
          </div>
          {ROWS.map((row, i) => (
            <motion.div
              className="whyus__row"
              role="row"
              key={row.label}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <div role="cell" className="whyus__label">{row.label}</div>
              <div role="cell" className="whyus__typical">{row.typical}</div>
              <div role="cell" className="whyus__optiwise">{row.optiwise}</div>
            </motion.div>
          ))}
        </div>

        <div className="whyus__cost">
          <div className="whyus__cost-head">
            <h3>Indicative construction costs, Indore</h3>
            <span className="coord-tag">Updated periodically &middot; ask us for a written quote</span>
          </div>
          <div className="whyus__cost-grid">
            <div className="cost-card">
              <span className="mono cost-card__range">₹1,500&ndash;₹1,900 / sq. ft.</span>
              <p>Basic construction &mdash; structure, standard fittings, simple finish</p>
            </div>
            <div className="cost-card">
              <span className="mono cost-card__range">₹1,900&ndash;₹2,400 / sq. ft.</span>
              <p>Standard construction &mdash; branded fittings, better finish, basic interiors</p>
            </div>
            <div className="cost-card">
              <span className="mono cost-card__range">₹2,400+ / sq. ft.</span>
              <p>Premium construction &mdash; designer interiors, higher-end materials &amp; facade</p>
            </div>
          </div>
          <p className="whyus__disclaimer">
            These are broad, indicative ranges for planning purposes only — actual
            cost depends on plot, design, materials and site conditions. We'll
            give you a firm, itemised estimate after a site visit.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
