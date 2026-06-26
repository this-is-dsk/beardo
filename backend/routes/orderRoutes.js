const express = require('express');

const router = express.Router();

const {
  createOrder,
  getUserOrders,
  getSingleOrder,
} = require('../controllers/orderController');

// Create Order
router.post('/create', createOrder);
router.get('/user/:userId', getUserOrders);
router.get('/:id', getSingleOrder);

module.exports = router;