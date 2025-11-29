const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// In-memory cart for demo (replace with DB if needed)
let carts = {};

// Add to cart
router.post('/add', (req, res) => {
  const { userId, product } = req.body;
  if (!carts[userId]) carts[userId] = [];
  carts[userId].push(product);
  res.json({ cart: carts[userId] });
});

// Get cart
router.get('/:userId', (req, res) => {
  res.json({ cart: carts[req.params.userId] || [] });
});

// Remove item
router.post('/remove', (req, res) => {
  const { userId, index } = req.body;
  if (carts[userId]) carts[userId].splice(index, 1);
  res.json({ cart: carts[userId] || [] });
});

module.exports = router;
