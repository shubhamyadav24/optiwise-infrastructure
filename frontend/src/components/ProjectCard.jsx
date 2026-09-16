import { motion } from 'framer-motion';
import './projectcard.css';

const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL || 'http://localhost:5000';

const resolveImg = (src) => {
  if (!src) return null;
  return src.startsWith('http') ? src : `${UPLOADS_URL}${src}`;
};

const ProjectCard = ({ project, index = 0 }) => {
  const img = resolveImg(project.coverImage);

  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: (index % 6) * 0.06, duration: 0.5 }}
    >
      <div className="project-card__media">
        {img ? (
          <img src={img} alt={project.title} loading="lazy" />
        ) : (
          <div className="project-card__placeholder grid-paper" aria-hidden="true">
            <span className="coord-tag">NO IMAGE</span>
          </div>
        )}
        <span className="project-card__status mono">{project.status}</span>
      </div>
      <div className="project-card__body">
        <span className="coord-tag">{project.category}{project.year ? ` · ${project.year}` : ''}</span>
        <h3>{project.title}</h3>
        {project.location && <p className="project-card__loc">{project.location}</p>}
      </div>
    </motion.article>
  );
};

export default ProjectCard;
