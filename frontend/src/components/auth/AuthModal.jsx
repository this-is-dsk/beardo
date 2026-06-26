import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';
import { loginUser, registerUser } from '../../api/authApi';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authModalTab, setAuthModalTab, login } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (apiError) setApiError('');
  };

  const validate = () => {
    const newErrors = {};
    if (authModalTab === 'signup') {
      if (!formData.name.trim()) newErrors.name = 'Full Name is required';
      if (!formData.mobile.match(/^[0-9]{10}$/)) newErrors.mobile = 'Valid 10-digit mobile number required';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      setApiError('');
      try {
        if (authModalTab === 'login') {
          const data = await loginUser({ email: formData.email, password: formData.password });
          login(data.token, data);
        } else {
          const data = await registerUser(formData);
          login(data.token, data);
        }
      } catch (err) {
        setApiError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-[#111111] border border-[#333] rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-[#222]">
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
              {authModalTab === 'login' ? 'Welcome Back' : 'Join Beardo'}
            </h2>
            <button onClick={closeAuthModal} className="text-gray-400 hover:text-white transition-colors">
              <IoClose size={24} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#222]">
            <button 
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                authModalTab === 'login' ? 'text-[#cc0000] border-b-2 border-[#cc0000]' : 'text-gray-500 hover:text-gray-300'
              }`}
              onClick={() => setAuthModalTab('login')}
            >
              Login
            </button>
            <button 
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                authModalTab === 'signup' ? 'text-[#cc0000] border-b-2 border-[#cc0000]' : 'text-gray-500 hover:text-gray-300'
              }`}
              onClick={() => setAuthModalTab('signup')}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {authModalTab === 'signup' && (
              <div>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full bg-[#1a1a1a] border ${errors.name ? 'border-[#cc0000]' : 'border-[#333] focus:border-[#cc0000]'} rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors`}
                />
                {errors.name && <p className="text-[#cc0000] text-xs mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <input 
                type="email" 
                name="email"
                placeholder={authModalTab === 'login' ? "Email or Mobile" : "Email Address"}
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full bg-[#1a1a1a] border ${errors.email ? 'border-[#cc0000]' : 'border-[#333] focus:border-[#cc0000]'} rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors`}
              />
              {errors.email && <p className="text-[#cc0000] text-xs mt-1">{errors.email}</p>}
            </div>

            {authModalTab === 'signup' && (
              <div>
                <input 
                  type="tel" 
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className={`w-full bg-[#1a1a1a] border ${errors.mobile ? 'border-[#cc0000]' : 'border-[#333] focus:border-[#cc0000]'} rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors`}
                />
                {errors.mobile && <p className="text-[#cc0000] text-xs mt-1">{errors.mobile}</p>}
              </div>
            )}

            <div>
              <input 
                type="password" 
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full bg-[#1a1a1a] border ${errors.password ? 'border-[#cc0000]' : 'border-[#333] focus:border-[#cc0000]'} rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors`}
              />
              {errors.password && <p className="text-[#cc0000] text-xs mt-1">{errors.password}</p>}
            </div>

            {authModalTab === 'signup' && (
              <div>
                <input 
                  type="password" 
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full bg-[#1a1a1a] border ${errors.confirmPassword ? 'border-[#cc0000]' : 'border-[#333] focus:border-[#cc0000]'} rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors`}
                />
                {errors.confirmPassword && <p className="text-[#cc0000] text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            {authModalTab === 'login' && (
              <div className="flex justify-between items-center pt-2">
                <label className="flex items-center space-x-2 text-sm text-gray-400 cursor-pointer">
                  <input type="checkbox" className="form-checkbox bg-[#1a1a1a] border-[#333] text-[#cc0000] rounded-sm focus:ring-0 focus:ring-offset-0" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="text-sm text-[#cc0000] hover:text-[#aa0000]">
                  Forgot Password?
                </button>
              </div>
            )}

            {apiError && (
              <div className="bg-[#cc0000]/10 border border-[#cc0000]/50 text-[#cc0000] px-4 py-2 rounded-sm text-sm text-center">
                {apiError}
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold py-4 uppercase tracking-widest rounded-sm transition-colors mt-6 shadow-lg shadow-[#cc0000]/20 flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                authModalTab === 'login' ? 'Login' : 'Create Account'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
