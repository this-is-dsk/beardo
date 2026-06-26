import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { IoClose, IoChevronForward } from 'react-icons/io5';
import { FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export const AccountPanel = ({ isOpen, onClose }) => {
  const { user, openAuthModal, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer (Right aligned) */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="relative w-[85%] max-w-sm h-full bg-[#111111] border-l border-[#222] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#222]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#cc0000] flex items-center justify-center text-white">
                  <FiUser size={20} />
                </div>
                <div className="flex flex-col">
                  {user ? (
                    <>
                      <span className="text-white font-bold text-lg leading-none">{user.name}</span>
                      <span className="text-gray-400 text-xs">{user.email}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-white font-bold text-lg leading-none">Account</span>
                      <span className="text-gray-400 text-xs">Welcome to Beardo</span>
                    </>
                  )}
                </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white p-2">
                <IoClose size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {!user ? (
                <div className="p-6 flex flex-col items-center justify-center h-full text-center">
                  <FiUser size={48} className="text-gray-600 mb-4" />
                  <h3 className="text-white font-bold text-lg mb-2">Join the Club</h3>
                  <p className="text-gray-400 text-sm mb-6">Login or sign up to manage your orders, track shipments, and access exclusive offers.</p>
                  
                  <button 
                    onClick={() => {
                      onClose();
                      openAuthModal('login');
                    }}
                    className="w-full bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold py-3 uppercase tracking-widest rounded-sm transition-colors mb-3"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => {
                      onClose();
                      openAuthModal('signup');
                    }}
                    className="w-full bg-transparent border border-gray-600 hover:border-white text-white font-bold py-3 uppercase tracking-widest rounded-sm transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="flex flex-col">
                  {[
                    { name: 'Profile', path: '/account' },
                    { name: 'My Orders', path: '/account' }, // Usually same page, diff tab
                    { name: 'Track Order', path: '/track-order' },
                    { name: 'Saved Addresses', path: '/account' }
                  ].map((link) => (
                    <Link 
                      key={link.name}
                      to={link.path}
                      onClick={onClose}
                      className="flex items-center justify-between p-4 border-b border-[#222] text-white hover:text-[#cc0000] transition-colors"
                    >
                      <span className="font-semibold uppercase tracking-wider text-sm">{link.name}</span>
                      <IoChevronForward className="text-gray-500" />
                    </Link>
                  ))}
                  
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin"
                      onClick={onClose}
                      className="flex items-center justify-between p-4 border-b border-[#222] text-[#cc0000] hover:text-[#aa0000] transition-colors"
                    >
                      <span className="font-semibold uppercase tracking-wider text-sm">Admin Dashboard</span>
                      <IoChevronForward className="text-[#cc0000]" />
                    </Link>
                  )}

                  <button 
                    onClick={() => {
                      logout();
                      onClose();
                      navigate('/');
                    }}
                    className="w-full flex items-center justify-between p-4 text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="font-semibold uppercase tracking-wider text-sm">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
