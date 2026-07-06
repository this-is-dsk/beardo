const Order = require("../models/Order");

// Create Order
const createOrder = async (req, res) => {
  try {

    // Duplicate Payment Protection
    if (req.body.razorpayPaymentId) {

      const existing = await Order.findOne({
        razorpayPaymentId: req.body.razorpayPaymentId,
      });

      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Order already exists for this payment.",
        });
      }
    }

    const order = await Order.create(req.body);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// User Orders
const getUserOrders = async (req, res) => {

  try {

    const { userId } = req.params;

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Single Order
const getSingleOrder = async (req, res) => {

  try {

    const order = await Order.findById(req.params.id);

    if (!order) {

      return res.status(404).json({
        success: false,
        message: "Order not found",
      });

    }

    res.json({
      success: true,
      order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  createOrder,
  getUserOrders,
  getSingleOrder,
};