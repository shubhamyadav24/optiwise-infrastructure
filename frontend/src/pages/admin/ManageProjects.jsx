import { useEffect, useState } from 'react';
import api from '../../api/axios';

const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL || 'http://localhost:5000';
const resolveImg = (src) => (src?.startsWith('http') ? src : `${UPLOADS_URL}${src}`);

const EMPTY_FORM = {
  title: '',
  category: 'Residential',
  location: '',
  year: new Date().getFullYear(),
  status: 'Completed',
  description: '',
  coverImage: '',
  gallery: [],
  featured: false
};

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState(null); // { type, text }

  const load = () => {
    api.get('/projects').then((res) => setProjects(res.data)).catch(() => {});
  };

  useEffect(load, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append('image', file);
    const res = await api.post('/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data.url;
  };

  const onCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      setForm((f) => ({ ...f, coverImage: url }));
    } catch (err) {
      setMsg({ type: 'err', text: 'Cover image upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const onGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls = await Promise.all(files.map(uploadFile));
      setForm((f) => ({ ...f, gallery: [...f.gallery, ...urls] }));
    } catch (err) {
      setMsg({ type: 'err', text: 'Gallery upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const removeGalleryImg = (url) => {
    setForm((f) => ({ ...f, gallery: f.gallery.filter((g) => g !== url) }));
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
        await api.put(`/projects/${editingId}`, form);
        setMsg({ type: 'ok', text: 'Project updated.' });
      } else {
        await api.post('/projects', form);
        setMsg({ type: 'ok', text: 'Project added.' });
      }
      resetForm();
      load();
    } catch (err) {
      setMsg({ type: 'err', text: err?.response?.data?.message || 'Could not save project.' });
    }
  };

  const onEdit = (p) => {
    setForm({
      title: p.title,
      category: p.category,
      location: p.location || '',
      year: p.year || '',
      status: p.status,
      description: p.description || '',
      coverImage: p.coverImage || '',
      gallery: p.gallery || [],
      featured: p.featured
    });
    setEditingId(p._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return;
    await api.delete(`/projects/${id}`);
    load();
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <span className="coord-tag">Manage</span>
          <h1>Projects</h1>
        </div>
      </div>

      {msg && <div className={`admin-msg admin-msg--${msg.type}`}>{msg.text}</div>}

      <form className="admin-panel" onSubmit={onSubmit}>
        <h2 style={{ fontSize: '1rem', textTransform: 'none', marginBottom: 18 }}>
          {editingId ? 'Edit project' : 'Add a new project'}
        </h2>

        <div className="admin-form-grid">
          <div className="admin-field">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" required value={form.title} onChange={onChange} />
          </div>
          <div className="admin-field">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={form.category} onChange={onChange}>
              {['Residential', 'Commercial', 'Interior', 'Farmhouse', 'Survey', 'Other'].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <label htmlFor="location">Location</label>
            <input id="location" name="location" value={form.location} onChange={onChange} />
          </div>
          <div className="admin-field">
            <label htmlFor="year">Year</label>
            <input id="year" name="year" type="number" value={form.year} onChange={onChange} />
          </div>
          <div className="admin-field">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={form.status} onChange={onChange}>
              {['Completed', 'Ongoing', 'Upcoming'].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <label htmlFor="featured">Featured on homepage</label>
            <select
              id="featured"
              name="featured"
              value={form.featured ? 'yes' : 'no'}
              onChange={(e) => setForm((f) => ({ ...f, featured: e.target.value === 'yes' }))}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          <div className="admin-field admin-field--full">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" rows={3} value={form.description} onChange={onChange} />
          </div>

          <div className="admin-field">
            <label htmlFor="cover">Cover image</label>
            <input id="cover" type="file" accept="image/*" onChange={onCoverUpload} />
            {form.coverImage && (
              <div className="admin-upload-preview">
                <img src={resolveImg(form.coverImage)} alt="Cover preview" />
              </div>
            )}
          </div>

          <div className="admin-field">
            <label htmlFor="gallery">Gallery images (multiple)</label>
            <input id="gallery" type="file" accept="image/*" multiple onChange={onGalleryUpload} />
            {form.gallery.length > 0 && (
              <div className="admin-upload-preview">
                {form.gallery.map((g) => (
                  <div key={g} style={{ position: 'relative' }}>
                    <img src={resolveImg(g)} alt="Gallery" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImg(g)}
                      style={{
                        position: 'absolute', top: -6, right: -6, width: 18, height: 18,
                        borderRadius: '50%', background: 'var(--rust)', color: '#fff',
                        border: 'none', fontSize: 11, lineHeight: '18px', padding: 0
                      }}
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="admin-form-actions">
          <button className="btn btn-primary" type="submit" disabled={uploading}>
            {uploading ? 'Uploading…' : editingId ? 'Save Changes' : 'Add Project'}
          </button>
          {editingId && (
            <button type="button" className="btn btn-outline" style={{ color: 'var(--ink)', borderColor: 'var(--line-on-paper)' }} onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-table-wrap">
        {projects.length === 0 ? (
          <p className="admin-empty">No projects yet — add your first one above.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Featured</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id}>
                  <td>
                    {p.coverImage ? (
                      <img className="admin-table__thumb" src={resolveImg(p.coverImage)} alt="" />
                    ) : (
                      <div className="admin-table__thumb" />
                    )}
                  </td>
                  <td>{p.title}</td>
                  <td><span className="badge">{p.category}</span></td>
                  <td>{p.status}</td>
                  <td>{p.featured ? <span className="badge badge--amber">Featured</span> : '—'}</td>
                  <td>
                    <div className="row-actions">
                      <button onClick={() => onEdit(p)}>Edit</button>
                      <button className="danger" onClick={() => onDelete(p._id)}>Delete</button>
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

export default ManageProjects;
