import { Link } from 'react-router-dom';
import './footer.css';

const INSTAGRAM_URL =
  import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/optiwiseinfrastructure';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="footer__logo">
            OPTIWISE <span>INFRASTRUCTURE</span>
          </div>
          <p className="footer__tagline">Creating Value. Crafting Excellence.</p>
          <p className="footer__addr">206, Girirajj Building, Bhawarkuan, Indore</p>
        </div>

        <div>
          <span className="coord-tag footer__heading">Explore</span>
          <nav className="footer__links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>

        <div>
          <span className="coord-tag footer__heading">Call / WhatsApp</span>
          <div className="footer__links">
            <a href="tel:+919039345023">Anil Yadav — 90393 45023</a>
            <a href="tel:+919630716170">Heeralal Yadav — 96307 16170</a>
            <a href="tel:+917489819747">Shubham Yadav — 74898 19747</a>
          </div>
        </div>

        <div>
          <span className="coord-tag footer__heading">Follow</span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="4.4" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
            </svg>
            @optiwiseinfrastructure
          </a>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Optiwise Infrastructure. All rights reserved.</span>
        <Link to="/admin/login" className="footer__admin">Admin</Link>
      </div>
    </footer>
  );
};

export default Footer;
