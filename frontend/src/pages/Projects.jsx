import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import ProjectCard from '../components/ProjectCard';
import api from '../api/axios';

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Interior', 'Farmhouse', 'Survey'];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('All');

  useEffect(() => {
    setLoading(true);
    const params = active === 'All' ? {} : { category: active };
    api
      .get('/projects', { params })
      .then((res) => setProjects(res.data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [active]);

  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Projects across Indore"
        lede="Residential homes, commercial spaces, farmhouses and surveys — a look at what we've built and planned."
      />
      <section className="section" style={{ background: 'var(--offwhite)' }}>
        <div className="container">
          <div className="filters">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`filter-pill ${active === c ? 'is-active' : ''}`}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {loading && <p className="coord-tag">Loading projects…</p>}

          {!loading && projects.length === 0 && (
            <p style={{ color: 'var(--steel-soft)' }}>
              No projects in this category yet — check back soon, or add one from the admin panel.
            </p>
          )}

          {!loading && projects.length > 0 && (
            <div
              className="services__grid"
              style={{
                background: 'transparent',
                border: 'none',
                gap: 24,
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
              }}
            >
              {projects.map((p, i) => (
                <ProjectCard project={p} index={i} key={p._id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Projects;
