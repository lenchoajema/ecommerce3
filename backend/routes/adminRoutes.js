const express = require('express');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const User = require('../models/user');
const Product = require('../models/product');
const router = express.Router();

// Get all users (Admin only)
router.get('/users', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete a product (Admin only)
router.delete('/product/:id', authenticate, authorizeRoles('admin'), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
