import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
  const res = await fetch('http://localhost:3000/api/contact');
      const data = await res.json();
      setMessages(data);
      setLoading(false);
    };
    fetchMessages();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#181818', color: '#fff', padding: '2rem' }}>
      <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2rem', marginBottom: '2rem' }}>Admin Dashboard</h2>
      <div style={{ background: '#222', borderRadius: 12, padding: '1.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.18)' }}>
        <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.3rem', marginBottom: '1rem' }}>Contact Messages</h3>
        {loading ? (
          <p>Loading...</p>
        ) : messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'transparent' }}>
            <thead>
              <tr style={{ background: '#181818', color: '#fff' }}>
                <th style={{ padding: '0.7rem', borderBottom: '2px solid #333', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '0.7rem', borderBottom: '2px solid #333', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '0.7rem', borderBottom: '2px solid #333', textAlign: 'left' }}>Message</th>
                <th style={{ padding: '0.7rem', borderBottom: '2px solid #333', textAlign: 'left' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(msg => (
                <tr key={msg.id} style={{ borderBottom: '1px solid #333' }}>
                  <td style={{ padding: '0.7rem', verticalAlign: 'top' }}>{msg.name}</td>
                  <td style={{ padding: '0.7rem', verticalAlign: 'top' }}>{msg.email}</td>
                  <td style={{ padding: '0.7rem', verticalAlign: 'top' }}>{msg.message}</td>
                  <td style={{ padding: '0.7rem', verticalAlign: 'top' }}>{new Date(msg.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
