const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

let recentEvents = [];

function broadcastStats() {
  const stats = {
    visitors: Math.floor(Math.random() * 120 + 20),
    tickets: Math.floor(Math.random() * 15 + 1),
    response: Math.floor(Math.random() * 180 + 50),
    timestamp: new Date().toISOString()
  };

  io.emit('statsUpdate', stats);
}

function broadcastEvent(event) {
  const payload = {
    message: event,
    time: new Date().toLocaleTimeString('en-IN')
  };

  recentEvents.unshift(payload);
  if (recentEvents.length > 10) {
    recentEvents.pop();
  }

  io.emit('eventUpdate', payload);
}

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' });
  }

  const contactItem = {
    id: Date.now(),
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };

  broadcastEvent(`Contact form submitted by ${name}`);

  return res.status(201).json({ status: 'received', contact: contactItem });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', now: new Date().toISOString() });
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.emit('statsUpdate', {
    visitors: Math.floor(Math.random() * 120 + 20),
    tickets: Math.floor(Math.random() * 15 + 1),
    response: Math.floor(Math.random() * 180 + 50),
    timestamp: new Date().toISOString()
  });

  recentEvents.slice(0, 6).forEach(ev => socket.emit('eventUpdate', ev));

  broadcastEvent('New realtime client connected');

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

setInterval(() => {
  const rnd = ['New lead generated from website form', 'Auto-scaling triggered for cloud app', 'AI prediction pipeline finished', 'Security scan passed on subdomain', 'Database replication healthy', 'New support ticket opened'];
  broadcastStats();
  broadcastEvent(rnd[Math.floor(Math.random() * rnd.length)]);
}, 1800);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`ESM Square Tech server running on http://localhost:${PORT}`);
});
