import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoClose, IoChevronDown, IoChevronUp, IoChevronForward } from 'react-icons/io5';
import { menuCategories } from '../../data/categories';

export const MobileMenu = ({ isOpen, onClose }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer (Left aligned) */}
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="relative w-[85%] max-w-sm h-full bg-white border-r border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <span className="text-black font-bold text-xl tracking-widest uppercase">BEARDO</span>
              <button onClick={onClose} className="text-gray-500 hover:text-black p-2">
                <IoClose size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pb-24">
              
              {/* Accordion Menu */}
              <div className="flex flex-col">
                <div className="border-b border-gray-200">
                  <button 
                    onClick={() => toggleCategory('products')}
                    className="w-full flex items-center justify-between p-4 text-gray-900 hover:text-[#cc0000] transition-colors"
                  >
                    <span className="font-semibold uppercase tracking-wider text-sm">Products</span>
                    {expandedCategory === 'products' ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
                  </button>
                  
                  <AnimatePresence>
                    {expandedCategory === 'products' && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-[#fafafa]"
                      >
                        <div className="flex flex-col py-2 px-4">
                          {menuCategories.map(cat => (
                            <div key={cat.id} className="mb-4">
                              <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">{cat.title}</h4>
                              <div className="grid grid-cols-2 gap-3">
                                {cat.items.map(item => (
                                  <Link 
                                    key={item.id} 
                                    to={`/category/${cat.id}`}
                                    onClick={onClose}
                                    className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                                  >
                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-black flex-shrink-0">
                                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-xs text-gray-800 font-medium">{item.name}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Static Links */}
                {[
                  { name: 'New Launch', path: '/new' },
                  { name: 'Alpha', path: '/alpha' },
                  { name: 'Look Book', path: '/look-book' },
                  { name: 'Track Order', path: '/track-order' },
                  { name: 'Franchise Enquiry', path: '/franchise' }
                ].map((link) => (
                  <Link 
                    key={link.name}
                    to={link.path}
                    onClick={onClose}
                    className="flex items-center justify-between p-4 border-b border-gray-200 text-gray-900 hover:text-[#cc0000] transition-colors"
                  >
                    <span className="font-semibold uppercase tracking-wider text-sm">{link.name}</span>
                    <IoChevronForward className="text-gray-500" />
                  </Link>
                ))}
              </div>

              {/* Bottom Links */}
              <div className="p-4 flex flex-col space-y-4 mt-4">
                {['About Us', 'Contact Us', 'Terms & Conditions', 'Privacy Policy', 'Return Policy', 'Nearby Stores', 'Warranty Registration'].map((link) => (
                  <Link 
                    key={link}
                    to="#"
                    className="text-gray-500 hover:text-black text-xs font-medium transition-colors "
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>

            {/* Sticky Bottom CTA */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200">
              <Link 
                to="/shop-all" 
                onClick={onClose}
                className="flex items-center justify-center w-full py-3 bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold text-sm tracking-wider uppercase transition-colors rounded-xl"
              >
                Shop All Products
              </Link>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
