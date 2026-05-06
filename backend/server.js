const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const path = require('path');

dotenv.config();

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

// Health check route (for Render to detect open port)
app.get('/health', (req, res) => res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));

// Serve Frontend static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}

// START SERVER FIRST — so Render detects the open port immediately
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// THEN connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected');

    // Seed default admin if none exists
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
      console.log('Default Admin seeded: admin@system.com / admin123');
    }
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    console.log('Server is running but database is not connected.');
  });
