const express = require('express');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

// Example: Add a product (Seller only)
router.post('/product', authenticate, authorizeRoles('seller'), (req, res) => {
  const productData = req.body; // Assume product details are passed in the body
  res.status(201).json({ message: 'Seller - Product added.', product: productData });
});

// Example: Update a product (Seller only)
router.put('/product/:id', authenticate, authorizeRoles('seller'), (req, res) => {
  const productData = req.body; // Assume updated product details are passed in the body
  res.status(200).json({
    message: `Seller - Updated product with ID: ${req.params.id}`,
    updatedProduct: productData,
  });
});

// Example: Delete a product (Seller only)
router.delete('/product/:id', authenticate, authorizeRoles('seller'), (req, res) => {
  res.status(200).json({ message: `Seller - Deleted product with ID: ${req.params.id}` });
});

module.exports = router;
