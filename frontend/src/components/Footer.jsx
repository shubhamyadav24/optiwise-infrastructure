import { Link } from 'react-router-dom';
import './footer.css';
import logoFooter from '../assets/logo_footer.png';

const INSTAGRAM_URL =
  import.meta.env.VITE_INSTAGRAM_URL ||
  'https://www.instagram.com/optiwiseinfrastructure';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__grid">

        {/* BRAND */}
        <div>
          <div className="footer__logo">
            <img
              src={logoFooter}
              alt="Optiwise Infrastructure"
              className="footer__logo-image"
            />
          </div>

          <p className="footer__tagline">
            Creating Value. Crafting Excellence.
          </p>

          <p className="footer__addr">
            206, Girirajj Building, Bhawarkuan, Indore
          </p>
        </div>

        {/* EXPLORE */}
        <div>
          <span className="coord-tag footer__heading">
            Explore
          </span>

          <nav className="footer__links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>

        {/* CALL / WHATSAPP */}
        <div>
          <span className="coord-tag footer__heading">
            Call / WhatsApp
          </span>

          <div className="footer__links">
            <a href="tel:+919039345023">
              Anil Yadav — 90393 45023
            </a>

            <a href="tel:+919630716170">
              Heeralal Yadav — 96307 16170
            </a>

            <a href="tel:+917489819747">
              Shubham Yadav — 74898 19747
            </a>
          </div>
        </div>

        {/* FOLLOW & CONNECT */}
        <div>
          <span className="coord-tag footer__heading">
            Follow & Connect
          </span>

          {/* Instagram */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="2.5"
                y="2.5"
                width="19"
                height="19"
                rx="5"
                stroke="currentColor"
                strokeWidth="1.6"
              />

              <circle
                cx="12"
                cy="12"
                r="4.4"
                stroke="currentColor"
                strokeWidth="1.6"
              />

              <circle
                cx="17.4"
                cy="6.6"
                r="1.1"
                fill="currentColor"
              />
            </svg>

            @optiwiseinfrastructure
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919039345023"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L4 20l1.2-3.6A8.5 8.5 0 1 1 20.5 11.5Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />

              <path
                d="M8.7 8.7c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4 0 .6l-.5.6c.5 1 1.3 1.8 2.3 2.3l.6-.5c.2-.1.4-.1.6 0l1.6.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.4.2-1 .3-1.5.2-1.1-.2-2.5-.9-3.8-2.1-1.2-1.2-1.9-2.6-2.1-3.8-.1-.5 0-1.1.2-1.5Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            WhatsApp — 90393 45023
          </a>

          {/* Email */}
          <a
            href="mailto:optiwiseinfrastructure@gmail.com"
            className="footer__social"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.6"
              />

              <path
                d="M4 7l8 6 8-6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            optiwiseinfrastructure@gmail.com
          </a>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="container footer__bottom">
        <span>
          © {new Date().getFullYear()} Optiwise Infrastructure.
          All rights reserved.
        </span>

        <Link
          to="/admin/login"
          className="footer__admin"
        >
          Admin
        </Link>
      </div>
    </footer>
  );
};

export default Footer;