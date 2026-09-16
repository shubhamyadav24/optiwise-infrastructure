import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './admin.css';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.username, form.password);
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth grid-paper--dark">
      <form className="admin-auth__card" onSubmit={onSubmit}>
        <span className="coord-tag admin-auth__tag">Restricted Area</span>
        <h1>Optiwise Admin</h1>
        <p className="admin-auth__lede">Sign in to manage projects, clients and enquiries.</p>

        <div className="contact__field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            required
            autoFocus
            value={form.username}
            onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
          />
        </div>
        <div className="contact__field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          />
        </div>

        {error && <p className="contact__status contact__status--err">{error}</p>}

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
