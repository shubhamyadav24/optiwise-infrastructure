import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './hero.css';

const draw = (delay = 0) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { delay, duration: 1.6, ease: 'easeInOut' }, opacity: { delay, duration: 0.3 } }
  }
});

const Hero = () => {
  return (
    <section className="hero grid-paper--dark">
      <div className="hero__ticks hero__ticks--top" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i}>{String(i).padStart(2, '0')}</span>
        ))}
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <motion.p
            className="eyebrow hero__eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Indore &middot; Planning to Handover
          </motion.p>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            We draft it,
            <br />
            survey it,
            <br />
            <span className="hero__title-accent">and build it.</span>
          </motion.h1>

          <motion.p
            className="hero__lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            Optiwise Infrastructure handles residential, commercial and farmhouse
            projects end-to-end &mdash; 2D planning, 3D elevation, TS/DGPS surveying,
            interior &amp; exterior design, and on-site construction &mdash; from the
            first site visit to the day you get the keys.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link to="/contact" className="btn btn-primary">
              Get a Free Site Visit
            </Link>
            <Link to="/projects" className="btn btn-outline">
              View Our Projects
            </Link>
          </motion.div>

          <motion.div
            className="hero__stats"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
          >
            <div>
              <span className="hero__stat-num mono">05</span>
              <span className="hero__stat-label">Core services</span>
            </div>
            <div>
              <span className="hero__stat-num mono">1</span>
              <span className="hero__stat-label">Point of contact,<br />start to finish</span>
            </div>
            <div>
              <span className="hero__stat-num mono">TS/DGPS</span>
              <span className="hero__stat-label">Precision survey<br />equipment</span>
            </div>
          </motion.div>
        </div>

        <div className="hero__blueprint" aria-hidden="true">
          <span className="coord-tag hero__blueprint-tag hero__blueprint-tag--tl">GRID A&ndash;1</span>
          <span className="coord-tag hero__blueprint-tag hero__blueprint-tag--br">EL. +00.00</span>
          <svg viewBox="0 0 420 460" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero__blueprint-svg">
            {/* Ground line */}
            <motion.line x1="20" y1="420" x2="400" y2="420" stroke="var(--amber)" strokeWidth="2"
              variants={draw(0.2)} initial="hidden" animate="visible" />
            {/* Main structure */}
            <motion.path
              d="M60 420 V220 L210 130 L360 220 V420"
              stroke="#f8f6f0" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"
              variants={draw(0.5)} initial="hidden" animate="visible"
            />
            {/* Roof ridge cap */}
            <motion.path d="M60 220 H360" stroke="#f8f6f0" strokeWidth="1.4"
              variants={draw(0.9)} initial="hidden" animate="visible" />
            {/* Floor divider */}
            <motion.path d="M60 320 H360" stroke="rgba(248,246,240,0.5)" strokeWidth="1.2" strokeDasharray="4 5"
              variants={draw(1.1)} initial="hidden" animate="visible" />
            {/* Door */}
            <motion.path d="M195 420 V340 H245 V420" stroke="var(--amber)" strokeWidth="1.6"
              variants={draw(1.2)} initial="hidden" animate="visible" />
            {/* Windows row 1 */}
            <motion.path d="M95 380 H145 V350 H95 Z" stroke="#f8f6f0" strokeWidth="1.2"
              variants={draw(1.3)} initial="hidden" animate="visible" />
            <motion.path d="M275 380 H325 V350 H275 Z" stroke="#f8f6f0" strokeWidth="1.2"
              variants={draw(1.3)} initial="hidden" animate="visible" />
            {/* Windows row 2 */}
            <motion.path d="M95 290 H145 V255 H95 Z" stroke="#f8f6f0" strokeWidth="1.2"
              variants={draw(1.4)} initial="hidden" animate="visible" />
            <motion.path d="M195 290 H245 V255 H195 Z" stroke="#f8f6f0" strokeWidth="1.2"
              variants={draw(1.4)} initial="hidden" animate="visible" />
            <motion.path d="M275 290 H325 V255 H275 Z" stroke="#f8f6f0" strokeWidth="1.2"
              variants={draw(1.4)} initial="hidden" animate="visible" />
            {/* Dimension line */}
            <motion.path d="M60 445 H360 M60 440 V450 M360 440 V450" stroke="var(--steel-soft)" strokeWidth="1"
              variants={draw(1.6)} initial="hidden" animate="visible" />
            <motion.text x="210" y="440" textAnchor="middle" fill="var(--steel-soft)" fontSize="11"
              fontFamily="IBM Plex Mono, monospace"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.4 }}>
              12.0 M
            </motion.text>
          </svg>
        </div>
      </div>

      <div className="hero__ticks hero__ticks--bottom" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i}>{String(i).padStart(2, '0')}</span>
        ))}
      </div>
    </section>
  );
};

export default Hero;
