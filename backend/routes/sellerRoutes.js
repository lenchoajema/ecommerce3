const express = require('express');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const Product = require('../models/product');
const router = express.Router();
const { validateProduct } = require('../middleware/validateProduct');


// Add a product
router.post('/product', authenticate, authorizeRoles('seller'), validateProduct, async (req, res) => {
  try {
    const { name, price, stock, description } = req.body;

    if (!name || !price || !stock) {
      return res.status(400).json({ message: 'Name, price, and stock are required.' });
    }

    const product = await Product.create({
      name,
      price,
      stock,
      description,
      seller: req.user._id,
    });

    res.status(201).json({ message: 'Product added successfully.', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Update a product
router.put('/product/:id', authenticate, authorizeRoles('seller'), async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, seller: req.user._id },
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized.' });
    }

    res.status(200).json({ message: 'Product updated successfully.', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Delete a product
router.delete('/product/:id', authenticate, authorizeRoles('seller'), async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      seller: req.user._id,
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized.' });
    }

    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// View all products by the seller with pagination
router.get('/products', authenticate, authorizeRoles('seller'), async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const products = await Product.find({ seller: req.user._id })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments({ seller: req.user._id });

    res.status(200).json({
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
