import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/projects', { params: { featured: 'true' } })
      .then((res) => setProjects(res.data.slice(0, 6)))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section" id="projects" style={{ background: 'var(--offwhite)' }}>
      <div className="container">
        <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <span className="eyebrow">Recent Work</span>
            <h2>A few sites we've handed over</h2>
          </div>
          <Link to="/projects" className="btn btn-dark">View All Projects</Link>
        </div>

        {loading && <p className="coord-tag">Loading projects…</p>}

        {!loading && projects.length === 0 && (
          <p style={{ color: 'var(--steel-soft)' }}>
            Projects will appear here once added from the admin panel.
          </p>
        )}

        {!loading && projects.length > 0 && (
          <div className="services__grid" style={{ background: 'transparent', border: 'none', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {projects.map((p, i) => (
              <ProjectCard project={p} index={i} key={p._id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
