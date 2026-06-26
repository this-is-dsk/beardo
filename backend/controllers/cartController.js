const Cart = require('../models/Cart');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user_id: req.user._id }).populate('products.product_id');
    if (!cart) {
      cart = await Cart.create({ user_id: req.user._id, products: [] });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    let cart = await Cart.findOne({ user_id: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user_id: req.user._id,
        products: [{ product_id, quantity }]
      });
    } else {
      // Check if item exists
      const itemIndex = cart.products.findIndex(p => p.product_id.toString() === product_id);
      if (itemIndex > -1) {
        // Update quantity
        cart.products[itemIndex].quantity += quantity;
      } else {
        cart.products.push({ product_id, quantity });
      }
      await cart.save();
    }
    
    // Populate before sending response
    await cart.populate('products.product_id');
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:product_id
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user_id: req.user._id });
    if (cart) {
      cart.products = cart.products.filter(p => p.product_id.toString() !== req.params.product_id);
      await cart.save();
      await cart.populate('products.product_id');
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart };
