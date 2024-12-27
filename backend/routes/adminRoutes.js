const express = require('express');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

// Example: Get all users (Admin only)
router.get('/users', authenticate, authorizeRoles('admin'), (req, res) => {
  res.status(200).json({ message: 'Admin - View all users.' });
});

// Example: Manage products (Admin only)
router.delete('/product/:id', authenticate, authorizeRoles('admin'), (req, res) => {
  res.status(200).json({ message: `Admin - Deleted product with ID: ${req.params.id}` });
});

module.exports = router;
