import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Badge } from './Badge';
import { FaStar } from 'react-icons/fa';

export const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { requireAuth } = useAuth();

  const {
    id,
    title,
    price,
    originalPrice,
    discount,
    rating,
    reviewsCount,
    image,
    hoverImage,
    isDealOfDay
  } = product;

  return (
    <motion.div 
      className="group relative flex flex-col bg-[#111111] border border-[#1f1f1f] rounded-xl overflow-hidden"
      whileHover={{ y: -4, boxShadow: '0 10px 20px -5px rgba(0,0,0,0.5)' }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-[4/5] bg-[#1a1a1a] overflow-hidden cursor-pointer">
        {isDealOfDay && (
          <div className="absolute top-2 left-2 z-10">
            <Badge variant="deal">DEAL OF THE DAY</Badge>
          </div>
        )}
        <img 
          src={isHovered && hoverImage ? hoverImage : image} 
          alt={title}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-white font-semibold text-[15px] leading-snug mb-1.5 line-clamp-2 cursor-pointer hover:text-[#cc0000] transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center space-x-1.5 text-xs text-gray-400 mb-2.5">
          <FaStar className="text-white" size={12} />
          <span className="text-white font-medium">{rating}</span>
          <span>|</span>
          <span>{reviewsCount} reviews</span>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-[17px] font-bold text-white">₹{price}</span>
            {originalPrice && (
              <span className="text-xs text-gray-500 line-through">₹{originalPrice}</span>
            )}
            {discount && (
              <Badge variant="discount">{discount}% OFF</Badge>
            )}
          </div>
          
          <button 
            onClick={() => requireAuth(() => addToCart(product))}
            className="w-full py-2.5 bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold text-sm tracking-wider uppercase transition-colors duration-300 rounded-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};
