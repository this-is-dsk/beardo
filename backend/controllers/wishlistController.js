const Wishlist = require('../models/Wishlist');

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user_id: req.user._id }).populate('products');
    if (!wishlist) {
      wishlist = await Wishlist.create({ user_id: req.user._id, products: [] });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add item to wishlist
// @route   POST /api/wishlist
// @access  Private
const addToWishlist = async (req, res) => {
  try {
    const { product_id } = req.body;
    let wishlist = await Wishlist.findOne({ user_id: req.user._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user_id: req.user._id,
        products: [product_id]
      });
    } else {
      if (!wishlist.products.includes(product_id)) {
        wishlist.products.push(product_id);
        await wishlist.save();
      }
    }
    
    await wishlist.populate('products');
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/:product_id
// @access  Private
const removeFromWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user_id: req.user._id });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(id => id.toString() !== req.params.product_id);
      await wishlist.save();
      await wishlist.populate('products');
      res.status(200).json(wishlist);
    } else {
      res.status(404).json({ message: 'Wishlist not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
