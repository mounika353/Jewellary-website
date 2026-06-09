import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Serve built React frontend
app.use(express.static(path.join(__dirname, '..', 'app', 'dist')));

// API: Get all items
app.get('/api/items', (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    // SQLite booleans are 0/1, let's map them to true/false for frontend
    const items = rows.map(r => ({
      ...r,
      isNew: !!r.isNew,
      isSpecial: !!r.isSpecial
    }));
    res.json(items);
  });
});

// API: Place Order
app.post('/api/orders', (req, res) => {
  const { name, email, address, payment, total, items } = req.body;
  db.run(`INSERT INTO orders (name, email, address, payment, total, status) VALUES (?, ?, ?, ?, ?, ?)`, 
    [name, email, address, payment, total, 'Pending'], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      const orderId = this.lastID;
      
      const stmt = db.prepare("INSERT INTO order_items (orderId, itemId, qty, price) VALUES (?, ?, ?, ?)");
      items.forEach(item => {
        stmt.run(orderId, item.id, item.qty, item.price);
      });
      stmt.finalize();

      // Emit real-time event to all connected clients
      io.emit('new_order', { orderId, name, total });

      res.status(201).json({ success: true, orderId });
  });
});

// API: Add Item (from Admin/Add Item modal)
app.post('/api/items', (req, res) => {
  const { name, category, price, weight, karat, image, isNew, isSpecial, discount, desc } = req.body;
  db.run(`INSERT INTO items (name, category, price, weight, karat, image, isNew, isSpecial, discount, desc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, category, price, weight, karat, image, isNew ? 1 : 0, isSpecial ? 1 : 0, discount, desc], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      const newItem = { id: this.lastID, name, category, price, weight, karat, image, isNew, isSpecial, discount, desc };
      
      // Emit to all clients so they instantly see the new product
      io.emit('new_item', newItem);
      res.status(201).json(newItem);
  });
});

// API: Book Appointment
app.post('/api/appointments', (req, res) => {
  const { name, phone, visit_date, visit_time } = req.body;
  db.run(`INSERT INTO appointments (name, phone, visit_date, visit_time, status) VALUES (?, ?, ?, ?, ?)`,
    [name, phone, visit_date, visit_time, 'Scheduled'], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ success: true, appointmentId: this.lastID });
  });
});

// API: Get all Appointments (Admin)
app.get('/api/appointments', (req, res) => {
  db.all("SELECT * FROM appointments ORDER BY visit_date ASC, visit_time ASC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Catch-all: serve React app for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'app', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
