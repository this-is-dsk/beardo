const Order = require('../models/Order');
const User = require('../models/User');

const getDashboardStats = async (req, res) => {

  try {

    const totalOrders = await Order.countDocuments();

    const totalUsers = await User.countDocuments();

    const pendingOrders = await Order.countDocuments({
      orderStatus: 'placed'
    });

    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount"
          }
        }
      }
    ]);

    const totalRevenue =
      revenueData.length > 0
        ? revenueData[0].totalRevenue
        : 0;

    res.json({

      success: true,

      totalOrders,

      totalUsers,

      pendingOrders,

      totalRevenue

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message

    });

  }

};

// Recent Orders

const getRecentOrders = async (req, res) => {

  try {

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      orders
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};

const updateOrderStatus = async (req, res) => {

  try {

    const { orderId } = req.params;

    const { orderStatus } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {

      return res.status(404).json({

        success: false,
        message: "Order not found"

      });

    }

    order.orderStatus = orderStatus;

    await order.save();

    res.json({

      success: true,
      message: "Order status updated",

      order

    });

  } catch (err) {

    res.status(500).json({

      success: false,
      message: err.message

    });

  }

};

module.exports = {

  getDashboardStats,

  getRecentOrders,

  updateOrderStatus,

};