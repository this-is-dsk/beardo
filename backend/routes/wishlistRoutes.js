const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, getWishlist)
  .post(protect, addToWishlist);

router.route('/:product_id')
  .delete(protect, removeFromWishlist);

module.exports = router;
