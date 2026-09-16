import { useEffect, useState } from 'react';
import api from '../../api/axios';

const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL || 'http://localhost:5000';
const resolveImg = (src) => (src?.startsWith('http') ? src : `${UPLOADS_URL}${src}`);

const EMPTY_FORM = { name: '', location: '', testimonial: '', rating: 5, photo: '' };

const ManageClients = () => {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState(null);

  const load = () => {
    api.get('/clients').then((res) => setClients(res.data)).catch(() => {});
    api.get('/projects').then((res) => setProjects(res.data)).catch(() => {});
  };

  useEffect(load, []);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onPhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append('image', file);
    try {
      const res = await api.post('/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setForm((f) => ({ ...f, photo: res.data.url }));
    } catch (err) {
      setMsg({ type: 'err', text: 'Photo upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      if (editingId) {
        await api.put(`/clients/${editingId}`, form);
        setMsg({ type: 'ok', text: 'Testimonial updated.' });
      } else {
        await api.post('/clients', form);
        setMsg({ type: 'ok', text: 'Testimonial added.' });
      }
      resetForm();
      load();
    } catch (err) {
      setMsg({ type: 'err', text: err?.response?.data?.message || 'Could not save testimonial.' });
    }
  };

  const onEdit = (c) => {
    setForm({
      name: c.name,
      location: c.location || '',
      testimonial: c.testimonial,
      rating: c.rating,
      photo: c.photo || '',
      project: c.project?._id || ''
    });
    setEditingId(c._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    await api.delete(`/clients/${id}`);
    load();
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <span className="coord-tag">Manage</span>
          <h1>Clients &amp; Testimonials</h1>
        </div>
      </div>

      {msg && <div className={`admin-msg admin-msg--${msg.type}`}>{msg.text}</div>}

      <form className="admin-panel" onSubmit={onSubmit}>
        <h2 style={{ fontSize: '1rem', textTransform: 'none', marginBottom: 18 }}>
          {editingId ? 'Edit testimonial' : 'Add a client testimonial'}
        </h2>

        <div className="admin-form-grid">
          <div className="admin-field">
            <label htmlFor="name">Client name</label>
            <input id="name" name="name" required value={form.name} onChange={onChange} />
          </div>
          <div className="admin-field">
            <label htmlFor="location">Location</label>
            <input id="location" name="location" value={form.location} onChange={onChange} />
          </div>
          <div className="admin-field">
            <label htmlFor="rating">Rating (1–5)</label>
            <select id="rating" name="rating" value={form.rating} onChange={onChange}>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <label htmlFor="project">Related project (optional)</label>
            <select id="project" name="project" value={form.project || ''} onChange={onChange}>
              <option value="">None</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>{p.title}</option>
              ))}
            </select>
          </div>

          <div className="admin-field admin-field--full">
            <label htmlFor="testimonial">Testimonial</label>
            <textarea id="testimonial" name="testimonial" rows={3} required value={form.testimonial} onChange={onChange} />
          </div>

          <div className="admin-field">
            <label htmlFor="photo">Client photo (optional)</label>
            <input id="photo" type="file" accept="image/*" onChange={onPhotoUpload} />
            {form.photo && (
              <div className="admin-upload-preview">
                <img src={resolveImg(form.photo)} alt="Client" />
              </div>
            )}
          </div>
        </div>

        <div className="admin-form-actions">
          <button className="btn btn-primary" type="submit" disabled={uploading}>
            {uploading ? 'Uploading…' : editingId ? 'Save Changes' : 'Add Testimonial'}
          </button>
          {editingId && (
            <button type="button" className="btn btn-outline" style={{ color: 'var(--ink)', borderColor: 'var(--line-on-paper)' }} onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-table-wrap">
        {clients.length === 0 ? (
          <p className="admin-empty">No testimonials yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Rating</th>
                <th>Testimonial</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c._id}>
                  <td>
                    {c.photo ? (
                      <img className="admin-table__thumb" src={resolveImg(c.photo)} alt="" />
                    ) : (
                      <div className="admin-table__thumb" />
                    )}
                  </td>
                  <td>{c.name}</td>
                  <td className="mono">{'★'.repeat(c.rating)}</td>
                  <td style={{ maxWidth: 320 }}>{c.testimonial.slice(0, 80)}{c.testimonial.length > 80 ? '…' : ''}</td>
                  <td>
                    <div className="row-actions">
                      <button onClick={() => onEdit(c)}>Edit</button>
                      <button className="danger" onClick={() => onDelete(c._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ManageClients;
