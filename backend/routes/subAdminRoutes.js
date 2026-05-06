const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Shop = require('../models/Shop');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorize('subadmin'));

// @route   GET /api/subadmin/agents
// @desc    Get all assigned agents
router.get('/agents', async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent', assignedTo: req.user._id });
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/subadmin/shops
// @desc    Get all shops of assigned agents
router.get('/shops', async (req, res) => {
  try {
    // Find agents assigned to this subadmin
    const agents = await User.find({ role: 'agent', assignedTo: req.user._id }).select('_id');
    const agentIds = agents.map(a => a._id);

    // Find shops created by those agents
    const shops = await Shop.find({ createdBy: { $in: agentIds } }).populate('createdBy', 'name email');
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/subadmin/analytics
// @desc    Get pincode stats
router.get('/analytics', async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent', assignedTo: req.user._id }).select('_id');
    const agentIds = agents.map(a => a._id);

    const shopsByPincode = await Shop.aggregate([
      { $match: { createdBy: { $in: agentIds } } },
      { $group: { _id: "$pincode", count: { $sum: 1 } } }
    ]);

    res.json({ shopsByPincode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
