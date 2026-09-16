import { motion } from 'framer-motion';
import './pageheader.css';

const PageHeader = ({ eyebrow, title, lede }) => {
  return (
    <section className="page-header grid-paper--dark">
      <div className="container">
        <motion.span
          className="eyebrow page-header__eyebrow"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          className="page-header__title"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {title}
        </motion.h1>
        {lede && (
          <motion.p
            className="page-header__lede"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {lede}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
