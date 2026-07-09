const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const users = {};       // { username: { color, joinedAt } }
const messages = [];    // [ { user, text, color, timestamp } ]

const COLORS = ['#e74c3c','#3498db','#2ecc71','#f39c12','#9b59b6','#1abc9c','#e67e22','#e91e63'];
let colorIndex = 0;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  if (url.pathname === '/' && req.method === 'GET') {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  if (url.pathname === '/api/join' && req.method === 'POST') {
    let body = '';
    req.on('data', d => body += d);
    req.on('end', () => {
      const { username } = JSON.parse(body);
      if (!username || username.trim() === '') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Username required' }));
        return;
      }
      const name = username.trim().toLowerCase();
      if (users[name]) {
        res.writeHead(409, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Username already taken' }));
        return;
      }
      const color = COLORS[colorIndex++ % COLORS.length];
      users[name] = { color, joinedAt: Date.now() };
      messages.push({ user: 'system', text: `${name} joined the chat`, color: '#888', timestamp: Date.now() });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ username: name, color }));
    });
    return;
  }

  if (url.pathname === '/api/leave' && req.method === 'POST') {
    let body = '';
    req.on('data', d => body += d);
    req.on('end', () => {
      const { username } = JSON.parse(body);
      if (users[username]) {
        delete users[username];
        messages.push({ user: 'system', text: `${username} left the chat`, color: '#888', timestamp: Date.now() });
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    });
    return;
  }

  if (url.pathname === '/api/send' && req.method === 'POST') {
    let body = '';
    req.on('data', d => body += d);
    req.on('end', () => {
      const { username, text } = JSON.parse(body);
      if (!users[username]) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not joined' }));
        return;
      }
      if (!text || text.trim() === '') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Empty message' }));
        return;
      }
      messages.push({ user: username, text: text.trim(), color: users[username].color, timestamp: Date.now() });
      if (messages.length > 100) messages.shift();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    });
    return;
  }

  if (url.pathname === '/api/messages' && req.method === 'GET') {
    const since = parseInt(url.searchParams.get('since') || '0');
    const newMsgs = messages.filter(m => m.timestamp > since);
    const onlineUsers = Object.keys(users).map(u => ({ name: u, color: users[u].color }));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ messages: newMsgs, users: onlineUsers }));
    return;
  }

  if (url.pathname === '/api/reset' && req.method === 'POST') {
    Object.keys(users).forEach(k => delete users[k]);
    messages.length = 0;
    colorIndex = 0;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  res.writeHead(404); res.end('Not found');
});

server.listen(PORT, () => console.log(`Multi-user chat running at http://localhost:${PORT}`));
