import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ projects: 0, clients: 0, messages: 0, unread: 0 });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    Promise.all([api.get('/projects'), api.get('/clients'), api.get('/contact')])
      .then(([p, c, m]) => {
        setStats({
          projects: p.data.length,
          clients: c.data.length,
          messages: m.data.length,
          unread: m.data.filter((x) => !x.read).length
        });
        setRecent(m.data.slice(0, 5));
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <div className="admin-header">
        <div>
          <span className="coord-tag">Overview</span>
          <h1>Dashboard</h1>
        </div>
        <Link to="/admin/projects" className="btn btn-dark">Add a Project</Link>
      </div>

      <div className="admin-stats">
        <div className="admin-stat">
          <span className="admin-stat__num mono">{stats.projects}</span>
          <span className="admin-stat__label">Projects listed</span>
        </div>
        <div className="admin-stat">
          <span className="admin-stat__num mono">{stats.clients}</span>
          <span className="admin-stat__label">Client testimonials</span>
        </div>
        <div className="admin-stat">
          <span className="admin-stat__num mono">{stats.messages}</span>
          <span className="admin-stat__label">Total enquiries</span>
        </div>
        <div className="admin-stat" style={{ borderTopColor: 'var(--amber)' }}>
          <span className="admin-stat__num mono">{stats.unread}</span>
          <span className="admin-stat__label">Unread enquiries</span>
        </div>
      </div>

      <div className="admin-header">
        <h2 style={{ fontSize: '1.1rem', margin: 0, textTransform: 'none' }}>Recent enquiries</h2>
        <Link to="/admin/messages" className="coord-tag">View all →</Link>
      </div>

      <div className="admin-table-wrap">
        {recent.length === 0 ? (
          <p className="admin-empty">No enquiries yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((m) => (
                <tr key={m._id}>
                  <td>{m.name}</td>
                  <td className="mono">{m.phone}</td>
                  <td>{m.service || '—'}</td>
                  <td className="mono">{new Date(m.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
