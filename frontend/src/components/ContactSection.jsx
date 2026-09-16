import { useState } from 'react';
import api from '../api/axios';
import './contact.css';

const CONTACTS = [
  { name: 'Anil Yadav', phone: '9039345023' },
  { name: 'Heeralal Yadav', phone: '9630716170' },
  { name: 'Shubham Yadav', phone: '7489819747' }
];

const ContactSection = ({ compact = false }) => {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.post('/contact', form);
      setStatus('sent');
      setForm({ name: '', phone: '', service: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="section contact grid-paper--dark" id="contact">
      <div className="container contact__grid">
        <div className="contact__info">
          <span className="eyebrow hero__eyebrow">Talk To Us</span>
          <h2 className="contact__title">Let's plan your site visit.</h2>
          <p className="contact__lede">
            Call, WhatsApp, or send your details below and we'll get back to you
            about your plot, requirements and timeline.
          </p>

          <div className="contact__people">
            {CONTACTS.map((c) => (
              <a key={c.phone} href={`tel:+91${c.phone}`} className="contact__person">
                <span className="contact__person-name">{c.name}</span>
                <span className="mono contact__person-phone">+91 {c.phone}</span>
              </a>
            ))}
          </div>

          <div className="contact__address">
            <span className="coord-tag">Office</span>
            <p>206, Girirajj Building, Bhawarkuan, Indore</p>
          </div>
        </div>

        <form className="contact__form" onSubmit={onSubmit}>
          <div className="contact__field">
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" required value={form.name} onChange={onChange} />
          </div>
          <div className="contact__field">
            <label htmlFor="phone">Phone number</label>
            <input id="phone" name="phone" type="tel" required value={form.phone} onChange={onChange} />
          </div>
          <div className="contact__field">
            <label htmlFor="service">What do you need?</label>
            <select id="service" name="service" value={form.service} onChange={onChange}>
              <option value="">Select a service</option>
              <option>2D Planning & 3D Elevation</option>
              <option>Contractor & Builder</option>
              <option>Interior & Exterior Design</option>
              <option>Project Consultancy</option>
              <option>TS & DGPS Survey</option>
              <option>Not sure yet</option>
            </select>
          </div>
          <div className="contact__field">
            <label htmlFor="message">Tell us about the project</label>
            <textarea id="message" name="message" rows={4} value={form.message} onChange={onChange} />
          </div>

          <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>

          {status === 'sent' && (
            <p className="contact__status contact__status--ok">
              Thanks! We've received your message and will call you back shortly.
            </p>
          )}
          {status === 'error' && (
            <p className="contact__status contact__status--err">
              Something went wrong. Please call us directly, or try again in a moment.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
