const express = require('express');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

// Sample route accessible only by Admin
router.get('/admin', authenticate, authorizeRoles('admin'), (req, res) => {
  res.status(200).json({ message: 'Welcome Admin!' });
});

// Sample route accessible by Admin and Seller
router.get('/seller', authenticate, authorizeRoles('admin', 'seller'), (req, res) => {
  res.status(200).json({ message: 'Welcome Seller or Admin!' });
});

// Sample route accessible by all authenticated users
router.get('/customer', authenticate, (req, res) => {
  res.status(200).json({ message: 'Welcome Customer!' });
});

module.exports = router;
