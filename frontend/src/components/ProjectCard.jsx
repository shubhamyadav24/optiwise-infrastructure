import { motion } from 'framer-motion';
import './projectcard.css';

const UPLOADS_URL =
  import.meta.env.VITE_UPLOADS_URL ||
  'https://optiwise-infrastructure.onrender.com';

const resolveImg = (src) => {
  if (!src) return null;

  // If MongoDB already contains a complete URL
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // Convert:
  // /uploads/image.png
  // into:
  // https://optiwise-infrastructure.onrender.com/uploads/image.png
  return `${UPLOADS_URL.replace(/\/$/, '')}/${src.replace(/^\//, '')}`;
};

const ProjectCard = ({ project, index = 0 }) => {
  const img = resolveImg(project.coverImage);

  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        delay: (index % 6) * 0.06,
        duration: 0.5,
      }}
    >
      {/* Project Image */}
      <div className="project-card__media">
        {img ? (
          <img
            src={img}
            alt={project.title || 'Project'}
            loading="lazy"
            onError={(e) => {
              console.error('Project image failed to load:', img);

              // Hide broken image
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div
            className="project-card__placeholder grid-paper"
            aria-hidden="true"
          >
            <span className="coord-tag">NO IMAGE</span>
          </div>
        )}

        {/* Project Status */}
        {project.status && (
          <span className="project-card__status mono">
            {project.status}
          </span>
        )}
      </div>

      {/* Project Information */}
      <div className="project-card__body">
        <span className="coord-tag">
          {project.category || 'PROJECT'}
          {project.year ? ` · ${project.year}` : ''}
        </span>

        <h3>{project.title}</h3>

        {project.location && (
          <p className="project-card__loc">
            {project.location}
          </p>
        )}
      </div>
    </motion.article>
  );
};

export default ProjectCard;