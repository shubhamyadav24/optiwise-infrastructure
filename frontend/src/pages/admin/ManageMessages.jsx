import { useEffect, useState } from 'react';
import api from '../../api/axios';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);

  const load = () => {
    api.get('/contact').then((res) => setMessages(res.data)).catch(() => {});
  };

  useEffect(load, []);

  const markRead = async (id) => {
    await api.put(`/contact/${id}/read`);
    load();
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return;
    await api.delete(`/contact/${id}`);
    load();
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <span className="coord-tag">Manage</span>
          <h1>Enquiries</h1>
        </div>
      </div>

      <div className="admin-table-wrap">
        {messages.length === 0 ? (
          <p className="admin-empty">No enquiries yet — messages sent from the contact form will show up here.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Message</th>
                <th>Received</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m._id}>
                  <td>
                    {m.read ? <span className="badge">Read</span> : <span className="badge badge--amber">New</span>}
                  </td>
                  <td>{m.name}</td>
                  <td className="mono"><a href={`tel:+91${m.phone}`}>{m.phone}</a></td>
                  <td>{m.service || '—'}</td>
                  <td style={{ maxWidth: 260 }}>{m.message || '—'}</td>
                  <td className="mono">{new Date(m.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="row-actions">
                      {!m.read && <button onClick={() => markRead(m._id)}>Mark Read</button>}
                      <button className="danger" onClick={() => onDelete(m._id)}>Delete</button>
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

export default ManageMessages;
