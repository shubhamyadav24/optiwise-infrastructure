import { useEffect, useState } from 'react';
import api from '../../api/axios';

const UPLOADS_URL =
  import.meta.env.VITE_UPLOADS_URL ||
  'https://optiwise-infrastructure.onrender.com';

/*
  Converts image paths into the correct backend URL.

  Examples:

  /uploads/image.png
  ->
  https://optiwise-infrastructure.onrender.com/uploads/image.png

  http://localhost:5000/uploads/image.png
  ->
  https://optiwise-infrastructure.onrender.com/uploads/image.png

  https://optiwise-infrastructure.onrender.com/uploads/image.png
  ->
  stays unchanged
*/
const resolveImg = (src) => {
  if (!src) return null;

  // Fix old localhost URLs saved in MongoDB
  if (src.startsWith('http://localhost:5000')) {
    return src.replace(
      'http://localhost:5000',
      UPLOADS_URL.replace(/\/$/, '')
    );
  }

  // Keep other complete URLs unchanged
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // Handle relative upload paths
  return `${UPLOADS_URL.replace(/\/$/, '')}/${src.replace(/^\//, '')}`;
};

const EMPTY_FORM = {
  title: '',
  category: 'Residential',
  location: '',
  year: new Date().getFullYear(),
  status: 'Completed',
  description: '',
  coverImage: '',
  gallery: [],
  featured: false,
};

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState(null);

  /* -----------------------------------------
     LOAD PROJECTS
  ----------------------------------------- */

  const load = () => {
    api
      .get('/projects')
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.error('Failed to load projects:', err);
        setProjects([]);
      });
  };

  useEffect(() => {
    load();
  }, []);

  /* -----------------------------------------
     FORM CHANGE
  ----------------------------------------- */

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  /* -----------------------------------------
     UPLOAD FILE
  ----------------------------------------- */

  const uploadFile = async (file) => {
    const data = new FormData();

    data.append('image', file);

    const res = await api.post('/upload', data);

    return res.data.url;
  };

  /* -----------------------------------------
     COVER IMAGE UPLOAD
  ----------------------------------------- */

  const onCoverUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);
    setMsg(null);

    try {
      const url = await uploadFile(file);

      setForm((f) => ({
        ...f,
        coverImage: url,
      }));

      setMsg({
        type: 'ok',
        text: 'Cover image uploaded successfully.',
      });
    } catch (err) {
      console.error('Cover upload error:', err);

      setMsg({
        type: 'err',
        text:
          err?.response?.data?.message ||
          'Cover image upload failed.',
      });
    } finally {
      setUploading(false);

      // Allow selecting the same file again
      e.target.value = '';
    }
  };

  /* -----------------------------------------
     GALLERY IMAGE UPLOAD
  ----------------------------------------- */

  const onGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    setUploading(true);
    setMsg(null);

    try {
      const urls = await Promise.all(
        files.map((file) => uploadFile(file))
      );

      setForm((f) => ({
        ...f,
        gallery: [...f.gallery, ...urls],
      }));

      setMsg({
        type: 'ok',
        text: `${urls.length} gallery image${
          urls.length > 1 ? 's' : ''
        } uploaded successfully.`,
      });
    } catch (err) {
      console.error('Gallery upload error:', err);

      setMsg({
        type: 'err',
        text:
          err?.response?.data?.message ||
          'Gallery upload failed.',
      });
    } finally {
      setUploading(false);

      // Allow selecting same files again
      e.target.value = '';
    }
  };

  /* -----------------------------------------
     REMOVE GALLERY IMAGE
  ----------------------------------------- */

  const removeGalleryImg = (url) => {
    setForm((f) => ({
      ...f,
      gallery: f.gallery.filter((g) => g !== url),
    }));
  };

  /* -----------------------------------------
     RESET FORM
  ----------------------------------------- */

  const resetForm = () => {
    setForm({
      ...EMPTY_FORM,
      year: new Date().getFullYear(),
    });

    setEditingId(null);
    setMsg(null);
  };

  /* -----------------------------------------
     SUBMIT PROJECT
  ----------------------------------------- */

  const onSubmit = async (e) => {
    e.preventDefault();

    setMsg(null);

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, form);

        setMsg({
          type: 'ok',
          text: 'Project updated successfully.',
        });
      } else {
        await api.post('/projects', form);

        setMsg({
          type: 'ok',
          text: 'Project added successfully.',
        });
      }

      resetForm();
      load();
    } catch (err) {
      console.error('Save project error:', err);

      setMsg({
        type: 'err',
        text:
          err?.response?.data?.message ||
          'Could not save project.',
      });
    }
  };

  /* -----------------------------------------
     EDIT PROJECT
  ----------------------------------------- */

  const onEdit = (p) => {
    setForm({
      title: p.title || '',
      category: p.category || 'Residential',
      location: p.location || '',
      year: p.year || '',
      status: p.status || 'Completed',
      description: p.description || '',
      coverImage: p.coverImage || '',
      gallery: p.gallery || [],
      featured: Boolean(p.featured),
    });

    setEditingId(p._id);

    setMsg(null);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /* -----------------------------------------
     DELETE PROJECT
  ----------------------------------------- */

  const onDelete = async (id) => {
    if (
      !window.confirm(
        'Delete this project? This cannot be undone.'
      )
    ) {
      return;
    }

    try {
      await api.delete(`/projects/${id}`);

      setMsg({
        type: 'ok',
        text: 'Project deleted successfully.',
      });

      load();
    } catch (err) {
      console.error('Delete project error:', err);

      setMsg({
        type: 'err',
        text:
          err?.response?.data?.message ||
          'Could not delete project.',
      });
    }
  };

  /* -----------------------------------------
     UI
  ----------------------------------------- */

  return (
    <>
      <div className="admin-header">
        <div>
          <span className="coord-tag">Manage</span>
          <h1>Projects</h1>
        </div>
      </div>

      {msg && (
        <div className={`admin-msg admin-msg--${msg.type}`}>
          {msg.text}
        </div>
      )}

      {/* ======================================
          PROJECT FORM
      ====================================== */}

      <form
        className="admin-panel"
        onSubmit={onSubmit}
      >
        <h2
          style={{
            fontSize: '1rem',
            textTransform: 'none',
            marginBottom: 18,
          }}
        >
          {editingId
            ? 'Edit project'
            : 'Add a new project'}
        </h2>

        <div className="admin-form-grid">

          {/* TITLE */}
          <div className="admin-field">
            <label htmlFor="title">
              Title
            </label>

            <input
              id="title"
              name="title"
              required
              value={form.title}
              onChange={onChange}
            />
          </div>

          {/* CATEGORY */}
          <div className="admin-field">
            <label htmlFor="category">
              Category
            </label>

            <select
              id="category"
              name="category"
              value={form.category}
              onChange={onChange}
            >
              {[
                'Residential',
                'Commercial',
                'Interior',
                'Farmhouse',
                'Survey',
                'Other',
              ].map((c) => (
                <option key={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* LOCATION */}
          <div className="admin-field">
            <label htmlFor="location">
              Location
            </label>

            <input
              id="location"
              name="location"
              value={form.location}
              onChange={onChange}
            />
          </div>

          {/* YEAR */}
          <div className="admin-field">
            <label htmlFor="year">
              Year
            </label>

            <input
              id="year"
              name="year"
              type="number"
              value={form.year}
              onChange={onChange}
            />
          </div>

          {/* STATUS */}
          <div className="admin-field">
            <label htmlFor="status">
              Status
            </label>

            <select
              id="status"
              name="status"
              value={form.status}
              onChange={onChange}
            >
              {[
                'Completed',
                'Ongoing',
                'Upcoming',
              ].map((s) => (
                <option key={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* FEATURED */}
          <div className="admin-field">
            <label htmlFor="featured">
              Featured on homepage
            </label>

            <select
              id="featured"
              name="featured"
              value={form.featured ? 'yes' : 'no'}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  featured:
                    e.target.value === 'yes',
                }))
              }
            >
              <option value="no">
                No
              </option>

              <option value="yes">
                Yes
              </option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <div className="admin-field admin-field--full">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={3}
              value={form.description}
              onChange={onChange}
            />
          </div>

          {/* ==================================
              COVER IMAGE
          ================================== */}

          <div className="admin-field">
            <label htmlFor="cover">
              Cover image
            </label>

            <input
              id="cover"
              type="file"
              accept="image/*"
              onChange={onCoverUpload}
            />

            {form.coverImage && (
              <div className="admin-upload-preview">
                <img
                  src={resolveImg(
                    form.coverImage
                  )}
                  alt="Cover preview"
                  onError={(e) => {
                    console.error(
                      'Cover preview failed:',
                      resolveImg(
                        form.coverImage
                      )
                    );
                  }}
                />
              </div>
            )}
          </div>

          {/* ==================================
              GALLERY
          ================================== */}

          <div className="admin-field">
            <label htmlFor="gallery">
              Gallery images (multiple)
            </label>

            <input
              id="gallery"
              type="file"
              accept="image/*"
              multiple
              onChange={onGalleryUpload}
            />

            {form.gallery.length > 0 && (
              <div className="admin-upload-preview">
                {form.gallery.map((g) => (
                  <div
                    key={g}
                    style={{
                      position: 'relative',
                    }}
                  >
                    <img
                      src={resolveImg(g)}
                      alt="Gallery"
                      onError={(e) => {
                        console.error(
                          'Gallery preview failed:',
                          resolveImg(g)
                        );
                      }}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeGalleryImg(g)
                      }
                      style={{
                        position: 'absolute',
                        top: -6,
                        right: -6,
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background:
                          'var(--rust)',
                        color: '#fff',
                        border: 'none',
                        fontSize: 11,
                        lineHeight: '18px',
                        padding: 0,
                        cursor: 'pointer',
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

        {/* FORM ACTIONS */}

        <div className="admin-form-actions">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={uploading}
          >
            {uploading
              ? 'Uploading…'
              : editingId
              ? 'Save Changes'
              : 'Add Project'}
          </button>

          {editingId && (
            <button
              type="button"
              className="btn btn-outline"
              style={{
                color: 'var(--ink)',
                borderColor:
                  'var(--line-on-paper)',
              }}
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ======================================
          PROJECT TABLE
      ====================================== */}

      <div className="admin-table-wrap">
        {projects.length === 0 ? (
          <p className="admin-empty">
            No projects yet — add your first one
            above.
          </p>
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

                  {/* THUMBNAIL */}

                  <td>
                    {p.coverImage ? (
                      <img
                        className="admin-table__thumb"
                        src={resolveImg(
                          p.coverImage
                        )}
                        alt={p.title || ''}
                        onError={(e) => {
                          console.error(
                            'Table image failed:',
                            resolveImg(
                              p.coverImage
                            )
                          );
                        }}
                      />
                    ) : (
                      <div className="admin-table__thumb" />
                    )}
                  </td>

                  {/* TITLE */}

                  <td>
                    {p.title}
                  </td>

                  {/* CATEGORY */}

                  <td>
                    <span className="badge">
                      {p.category}
                    </span>
                  </td>

                  {/* STATUS */}

                  <td>
                    {p.status}
                  </td>

                  {/* FEATURED */}

                  <td>
                    {p.featured ? (
                      <span className="badge badge--amber">
                        Featured
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>

                  {/* ACTIONS */}

                  <td>
                    <div className="row-actions">
                      <button
                        type="button"
                        onClick={() =>
                          onEdit(p)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="danger"
                        onClick={() =>
                          onDelete(p._id)
                        }
                      >
                        Delete
                      </button>
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