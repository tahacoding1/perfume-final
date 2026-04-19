import React, { useState } from 'react';
import './Misc.css';

const API = 'http://127.0.0.1:8000/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="info-page page-padding animate-fade-up">
      <div className="container">
        <div className="info-header text-center">
          <span className="section-label">Get in Touch</span>
          <h1 className="section-title">Contact <em>Us</em></h1>
        </div>

        <div className="contact-wrapper">

          {/* FORM */}
          <form className="contact-form" onSubmit={handleSubmit}>
            {status === 'success' ? (
              <div className="contact-success">
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✉️</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our concierge team will reply within 24 hours.</p>
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ marginTop: '20px' }}
                  onClick={() => setStatus('idle')}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sara Ahmed"
                    disabled={status === 'loading'}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sara@example.com"
                    disabled={status === 'loading'}
                  />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Order inquiry, Custom fragrance..."
                    disabled={status === 'loading'}
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    disabled={status === 'loading'}
                  />
                </div>

                {status === 'error' && (
                  <p style={{ color: '#e74c3c', fontSize: '0.9rem', marginBottom: '12px' }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </>
            )}
          </form>

          {/* CONTACT INFO */}
          <div className="contact-info">
            <h3>Boutique Details</h3>
            <div className="contact-info-item">
              <strong>📍 Address</strong>
              <p>12A Luxury Avenue<br />Gulberg III, Lahore, Pakistan</p>
            </div>
            <div className="contact-info-item">
              <strong>📞 Phone</strong>
              <p>+92 300 1234567</p>
            </div>
            <div className="contact-info-item">
              <strong>✉️ Email</strong>
              <p>hello@lumiere.pk</p>
            </div>
            <div className="contact-info-item">
              <strong>🕐 Hours</strong>
              <p>Mon – Sat: 10:00 AM – 9:00 PM<br />Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
