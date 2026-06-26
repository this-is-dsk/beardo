import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, amount, paymentMethod } = location.state || {};

  useEffect(() => {
    // If someone tries to access this route directly without an order, redirect home
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  if (!orderId) return null;

  // Mock estimated delivery
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const formattedDate = deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full bg-[#111] border border-gray-800 p-8 rounded-sm text-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-[#00cc00]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="text-[#00cc00] text-4xl">✓</div>
        </div>
        
        <h1 className="text-2xl font-bold text-white uppercase tracking-widest mb-2">Order Confirmed!</h1>
        <p className="text-gray-400 mb-8">Thank you for shopping with Beardo.</p>
        
        <div className="bg-[#1a1a1a] p-4 rounded-sm mb-8 text-left space-y-3 border border-gray-800">
          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-500 text-sm">Order ID</span>
            <span className="text-white font-bold">{orderId}</span>
          </div>
          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-500 text-sm">Amount Paid</span>
            <span className="text-white font-bold">₹{amount}</span>
          </div>
          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-500 text-sm">Payment Method</span>
            <span className="text-white font-bold uppercase">{paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Est. Delivery</span>
            <span className="text-[#00cc00] font-bold text-sm text-right">{formattedDate}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <button 
            onClick={() => navigate('/track-order')}
            className="w-full bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold py-4 uppercase tracking-widest transition-colors"
          >
            Track Order
          </button>
          <button 
            onClick={() => navigate('/shop-all')}
            className="w-full bg-transparent border border-gray-700 hover:border-white text-white font-bold py-4 uppercase tracking-widest transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
