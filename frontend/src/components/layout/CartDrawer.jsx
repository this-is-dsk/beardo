import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { IoClose } from 'react-icons/io5';
import { FaTrash } from 'react-icons/fa';

export const CartDrawer = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { requireAuth } = useAuth();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);

const remainingItems = totalItems >= 4 ? 0 : 4 - totalItems;

const isB2G2Unlocked = totalItems >= 4;

const subtotal = getCartTotal();

const discount = isB2G2Unlocked
  ? Math.floor(subtotal / 2)
  : 0;

const finalTotal = subtotal - discount;
  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-70 z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#111111] border-l border-gray-800 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold uppercase tracking-wider text-white">Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-[#cc0000] transition-colors"
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length > 0 && (
  <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800 mb-4">

    {!isB2G2Unlocked ? (
      <>
        <p className="text-sm text-white mb-2">
          Add {remainingItems} more product
          {remainingItems > 1 ? "s" : ""}
          {" "}to unlock BUY 2 GET 2 FREE
        </p>

        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#cc0000]"
            style={{
              width: `${(totalItems / 4) * 100}%`,
            }}
          />
        </div>
      </>
    ) : (
      <p className="text-green-400 font-bold text-center">
        🎉 BUY 2 GET 2 FREE UNLOCKED
      </p>
    )}

  </div>
)}
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                  <p>Your cart is empty.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 px-6 py-2 border border-[#cc0000] text-[#cc0000] hover:bg-[#cc0000] hover:text-white transition-colors"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-800 pb-4">
                    <div className="w-20 h-24 bg-[#1a1a1a] flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-white leading-tight mb-1">{item.title}</h3>
                        <p className="text-[#cc0000] font-bold">₹{item.price}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-700">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-400 hover:text-white"
                          >-</button>
                          <span className="px-3 text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-400 hover:text-white"
                          >+</button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-[#cc0000]"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-800 bg-[#0a0a0a]">
                <div className="space-y-2 mb-4">

  <div className="flex justify-between text-white">
    <span>Subtotal</span>
    <span>₹{subtotal}</span>
  </div>

  {discount > 0 && (
    <div className="flex justify-between text-green-400">
      <span>B2G2 Discount</span>
      <span>-₹{discount}</span>
    </div>
  )}

  <div className="flex justify-between text-lg font-bold border-t border-gray-800 pt-2 text-white">
    <span>Total</span>
    <span className="text-[#cc0000]">
      ₹{finalTotal}
    </span>
  </div>

</div>
                <p className="text-xs text-gray-500 mb-6 text-center">Shipping & taxes calculated at checkout</p>
                <button 
                  onClick={() => {
                    requireAuth(() => {
                      setIsCartOpen(false);
                      navigate('/checkout');
                    });
                  }}
                  className="w-full py-4 bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold tracking-widest uppercase transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
