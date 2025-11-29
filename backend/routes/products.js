const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET products with filters, search, pagination
router.get('/', async (req, res) => {
  const { search = '', category, size, min, max, page = 1, limit = 10 } = req.query;
  const query = {};

  if (search) query.$or = [
    { name: { $regex: search, $options: 'i' } },
    { description: { $regex: search, $options: 'i' } },
  ];
  if (category) query.category = category;
  if (size) query.sizes = size;
  if (min || max) query.price = {};
  if (min) query.price.$gte = Number(min);
  if (max) query.price.$lte = Number(max);

  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Product.countDocuments(query);

  res.json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });
});

module.exports = router;
