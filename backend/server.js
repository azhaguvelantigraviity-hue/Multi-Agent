const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const path = require('path');

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/subadmin', require('./routes/subAdminRoutes'));
app.use('/api/agent', require('./routes/agentRoutes'));

// Serve Frontend static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all to serve index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/multi-agent';

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

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
