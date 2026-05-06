const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorize('agent'));

// @route   POST /api/agent/shops
// @desc    Add a new shop
router.post('/shops', async (req, res) => {
  try {
    const { shopName, ownerName, mobile, address, pincode, category, location } = req.body;
    
    const shop = await Shop.create({
      shopName, ownerName, mobile, address, pincode, category, location,
      createdBy: req.user._id
    });

    res.status(201).json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/agent/shops
// @desc    Get my shops
router.get('/shops', async (req, res) => {
  try {
    const shops = await Shop.find({ createdBy: req.user._id });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/agent/analytics
// @desc    Get my shop count based on pincode
router.get('/analytics', async (req, res) => {
  try {
    const shopsByPincode = await Shop.aggregate([
      { $match: { createdBy: req.user._id } },
      { $group: { _id: "$pincode", count: { $sum: 1 } } }
    ]);

    res.json({ shopsByPincode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
