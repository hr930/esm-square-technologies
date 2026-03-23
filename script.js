const clockEl = document.getElementById('clock');
const yearEl = document.getElementById('year');
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
const liveUpdates = document.getElementById('liveUpdates');
const visitorsEl = document.getElementById('stat-visitors');
const ticketsEl = document.getElementById('stat-tickets');
const responseEl = document.getElementById('stat-response');

function updateClock() {
  const now = new Date();
  clockEl.textContent = now.toLocaleTimeString('en-IN', { hour12: false });
}

setInterval(updateClock, 1000);
updateClock();

yearEl.textContent = new Date().getFullYear();

function addLiveEvent(text) {
  const li = document.createElement('li');
  li.textContent = `${new Date().toLocaleTimeString('en-IN')} - ${text}`;
  liveUpdates.prepend(li);
  while (liveUpdates.children.length > 8) {
    liveUpdates.removeChild(liveUpdates.lastChild);
  }
}

function setStats(data) {
  visitorsEl.textContent = data.visitors ?? '0';
  ticketsEl.textContent = data.tickets ?? '0';
  responseEl.textContent = data.response ?? '0';
}

const socket = io();

socket.on('connect', () => {
  addLiveEvent('Connected to realtime backend');
});

socket.on('statsUpdate', (stats) => {
  setStats(stats);
});

socket.on('eventUpdate', (event) => {
  addLiveEvent(event.message || 'Update received');
});

socket.on('disconnect', () => {
  addLiveEvent('Disconnected from realtime backend');
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = 'Sending message...';

  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim(),
  };

  try {
    const resp = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const body = await resp.json();
      throw new Error(body.error || 'Failed to send');
    }

    const result = await resp.json();
    statusEl.textContent = 'Thanks! Your message has been received. We will contact you shortly.';
    form.reset();
    addLiveEvent(`${result.contact.name} submitted a contact request`);
  } catch (err) {
    statusEl.textContent = 'Could not send message. Please try again later.';
    addLiveEvent('Contact form error: ' + err.message);
  }
});
