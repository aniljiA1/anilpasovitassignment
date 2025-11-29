const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Order = require('../models/Order');
const nodemailer = require('nodemailer');

// Place order
router.post('/', protect, async (req, res) => {
  const { items, totalPrice } = req.body;
  const order = await Order.create({ user: req.user._id, items, totalPrice });

  // Send email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  let itemsHtml = items.map(i => `<li>${i.product.name} - ${i.size} x ${i.quantity}</li>`).join('');
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: req.user.email,
    subject: `Order Confirmation - ${order._id}`,
    html: `<h2>Thank you for your order!</h2>
           <p>Order ID: ${order._id}</p>
           <p>Date: ${order.createdAt}</p>
           <ul>${itemsHtml}</ul>
           <p>Total: $${totalPrice}</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log('Email sent: ' + info.response);
  });

  res.json(order);
});

// Get user orders
router.get('/', protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.product');
  res.json(orders);
});

module.exports = router;
