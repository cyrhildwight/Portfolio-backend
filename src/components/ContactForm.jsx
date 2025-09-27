import React, { useState } from 'react';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
  const res = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Message sent!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setError(data.error || 'Failed to send message.');
      }
    } catch (err) {
      setError('Network error.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto', background: '#222', padding: '2rem', borderRadius: 12, color: '#fff' }}>
      <h2 style={{ marginBottom: '1rem' }}>Contact Me</h2>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
        style={{ width: '100%', padding: '0.7rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #333', background: '#181818', color: '#fff' }}
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        required
        style={{ width: '100%', padding: '0.7rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #333', background: '#181818', color: '#fff' }}
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={form.message}
        onChange={handleChange}
        required
        rows={5}
        style={{ width: '100%', padding: '0.7rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #333', background: '#181818', color: '#fff' }}
      />
      <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.8rem', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg, #fff 0%, #bfbfbf 100%)', color: '#181818', fontWeight: 600, cursor: 'pointer' }}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
      {success && <div style={{ color: '#4caf50', marginTop: '1rem' }}>{success}</div>}
      {error && <div style={{ color: '#ff4d4f', marginTop: '1rem' }}>{error}</div>}
    </form>
  );
};

export default ContactForm;
