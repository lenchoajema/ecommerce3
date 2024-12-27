const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

// Example: View products (All authenticated customers)
router.get('/products', authenticate, (req, res) => {
  res.status(200).json({ message: 'Customer - View all products.' });
});
// Example: Place an order (Customer only)
router.post('/order', authenticate, (req, res) => {
    const orderData = req.body; // Assume order details are passed in the body
    res.status(201).json({ message: 'Customer - Order placed.', order: orderData });
  });
  
  module.exports = router;
  