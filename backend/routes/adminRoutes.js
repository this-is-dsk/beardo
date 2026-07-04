const express = require('express');

const router = express.Router();

const {
  getDashboardStats,
  getRecentOrders,
  getOrderTracking,
  updateOrderStatus,
} = require('../controllers/adminController');

router.get('/dashboard', getDashboardStats);
router.get('/recent-orders', getRecentOrders);
router.get('/order/:orderId', getOrderTracking);
router.put('/order/:orderId', updateOrderStatus);

module.exports = router;