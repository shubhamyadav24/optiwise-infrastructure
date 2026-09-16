import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './navbar.css';
import logo from '../assets/logo.png'; 
const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__logo" onClick={() => setOpen(false)}>
  <img
  src={logo}
  alt="Optiwise Infrastructure"
  className="navbar__logo-image"
  style={{
    height: "66px",
    width: "auto",
    maxWidth: "240px",
    objectFit: "contain",
    display: "block"
  }}
/>
</NavLink>

        <nav className="navbar__links navbar__links--desktop" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/contact" className="btn btn-primary navbar__cta">
          Get a Quote
        </NavLink>

        <button
          className="navbar__burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={open ? 'is-open' : ''} />
          <span className={open ? 'is-open' : ''} />
          <span className={open ? 'is-open' : ''} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="navbar__mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            aria-label="Mobile"
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `navbar__mobile-link ${isActive ? 'is-active' : ''}`}
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink to="/contact" onClick={() => setOpen(false)} className="btn btn-primary">
              Get a Quote
            </NavLink>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
