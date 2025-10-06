// Simple in-memory store for demo purposes
let messages = [];

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://cyrhildwight.vercel.app/');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  if (req.method === 'POST') {
    let body = req.body;
    // If body is undefined, parse manually
    if (!body || typeof body === 'string') {
      try {
        body = JSON.parse(req.body);
      } catch {
        body = {};
      }
    }
    const { name, email, message } = body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const newMessage = {
      id: Date.now(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };
    messages.unshift(newMessage);
    return res.status(201).json({ success: true, message: 'Message sent!', data: newMessage });
  }
  if (req.method === 'GET') {
    return res.status(200).json(messages);
  }
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
