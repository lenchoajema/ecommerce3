const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const Product = require('../models/product');
const Order = require('../models/order');
const router = express.Router();

// Get all products (Customer)
router.get('/products', authenticate, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Place an order (Customer)
router.post('/order', authenticate, async (req, res) => {
  try {
    const { products } = req.body; // Assume products is an array of { product, quantity }
    let totalAmount = 0;

    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: `Product not found: ${item.product}` });
      if (product.stock < item.quantity)
        return res.status(400).json({ message: `Insufficient stock for product: ${product.name}` });
      totalAmount += product.price * item.quantity;
    }

    const order = await Order.create({ customer: req.user._id, products, totalAmount });
    res.status(201).json({ message: 'Order placed successfully.', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Browse all products with pagination and filtering
router.get('/products', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', minPrice, maxPrice } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (minPrice) {
      query.price = { ...query.price, $gte: parseInt(minPrice) };
    }

    if (maxPrice) {
      query.price = { ...query.price, $lte: parseInt(maxPrice) };
    }

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

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
