import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './admin.css';

const NAV = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/clients', label: 'Clients & Testimonials' },
  { to: '/admin/messages', label: 'Enquiries' }
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div>
          <div className="admin-sidebar__logo">
            OPTIWISE <span>ADMIN</span>
          </div>
          <div className="admin-sidebar__sub">CONTROL PANEL</div>
        </div>

        <nav>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <span className="admin-sidebar__view">Signed in as {admin?.username}</span>
          <NavLink to="/" className="admin-sidebar__view">← View live site</NavLink>
          <button className="admin-sidebar__logout" onClick={onLogout}>Log Out</button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
