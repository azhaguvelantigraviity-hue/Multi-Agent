const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const checkDB = (res) => {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({ message: 'Database not connected. Please check MongoDB Atlas IP whitelist settings.' });
    return false;
  }
  return true;
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
};

// @route   POST /api/auth/register
// @desc    Register a new agent
// @access  Public
router.post('/register', async (req, res) => {
  if (!checkDB(res)) return;
  const { name, email, password, mobile, pincode, address } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name, email, password: hashedPassword, mobile, pincode, address,
      role: 'agent', status: 'pending'
    });

    res.status(201).json({ message: 'Registration successful. Waiting for admin approval.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Auth user & get token
// @access  Public
router.post('/login', async (req, res) => {
  if (!checkDB(res)) return;
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    if (user.role === 'agent' && user.status !== 'approved') {
      return res.status(403).json({ message: 'Your account is not approved yet.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    res.json({
      _id: user._id, name: user.name, email: user.email, role: user.role, status: user.status,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
