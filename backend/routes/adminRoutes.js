const express = require('express');

const router = express.Router();

const {
  getDashboardStats,
  getRecentOrders,
  updateOrderStatus,
} = require('../controllers/adminController');

router.get('/dashboard', getDashboardStats);
router.get('/recent-orders', getRecentOrders);
router.put('/order/:orderId', updateOrderStatus);

module.exports = router;