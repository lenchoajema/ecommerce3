const express = require('express');
const { getProducts } = require('../controllers/productController');
const router = express.Router();
const productController = require('../controllers/productController');
router.get('/customer/products', productController.getProducts);
module.exports = router;