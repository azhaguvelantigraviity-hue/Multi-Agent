const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Shop = require('../models/Shop');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorize('admin'));

// @route   GET /api/admin/analytics
// @desc    Get dashboard analytics
router.get('/analytics', async (req, res) => {
  try {
    const totalAgents = await User.countDocuments({ role: 'agent' });
    const activeAgents = await User.countDocuments({ role: 'agent', status: 'approved' });
    const totalShops = await Shop.countDocuments();
    
    // Group shops by pincode
    const shopsByPincode = await Shop.aggregate([
      { $group: { _id: "$pincode", count: { $sum: 1 } } }
    ]);

    res.json({ totalAgents, activeAgents, totalShops, shopsByPincode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/agents
// @desc    Get all agents
router.get('/agents', async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent' }).populate('assignedTo', 'name');
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/agents/:id/status
// @desc    Approve or reject agent
router.put('/agents/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const agent = await User.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(agent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/admin/subadmins
// @desc    Create a new sub admin
router.post('/subadmins', async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const subAdmin = await User.create({
      name, email, password: hashedPassword, mobile, role: 'subadmin', status: 'approved'
    });
    res.status(201).json(subAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/subadmins
// @desc    Get all subadmins
router.get('/subadmins', async (req, res) => {
  try {
    const subAdmins = await User.find({ role: 'subadmin' });
    res.json(subAdmins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/agents/:id/assign
// @desc    Assign agent to sub admin
router.put('/agents/:id/assign', async (req, res) => {
  try {
    const { subAdminId } = req.body;
    const agent = await User.findByIdAndUpdate(req.params.id, { assignedTo: subAdminId }, { new: true });
    res.json(agent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/shops
// @desc    Get all shops
router.get('/shops', async (req, res) => {
  try {
    const shops = await Shop.find().populate('createdBy', 'name email');
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
