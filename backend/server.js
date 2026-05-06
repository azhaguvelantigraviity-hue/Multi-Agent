// Prevent crashes FIRST - before anything else
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason?.message || reason);
});
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message);
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

// Load env vars
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/multi-agent';

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/subadmin', require('./routes/subAdminRoutes'));
app.use('/api/agent', require('./routes/agentRoutes'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// Serve Frontend in production
const distPath = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// START SERVER — keeps process alive regardless of DB status
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err.message);
});

// Connect to MongoDB (non-blocking)
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
})
  .then(async () => {
    console.log('✅ MongoDB Connected');
    const User = require('./models/User');
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      await User.create({
        name: 'Super Admin',
        email: 'admin@system.com',
        password: hashedPassword,
        role: 'admin',
        mobile: '0000000000',
        status: 'approved'
      });
      console.log('✅ Default Admin seeded: admin@system.com / admin123');
    }
  })
  .catch((err) => {
    console.error('❌ MongoDB Error:', err.message);
    console.log('⚠️  Server is live but DB is offline. Fix MongoDB Atlas IP whitelist.');
  });
