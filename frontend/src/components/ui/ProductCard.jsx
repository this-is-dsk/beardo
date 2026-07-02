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
  className="group relative flex flex-col w-full h-full bg-white border border-[#e5e5e5] rounded-xl overflow-hidden"
      whileHover={{ y: -4, boxShadow: '0 10px 20px -5px rgba(0,0,0,0.5)' }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-[175px] md:h-[240px] bg-[#efefef] overflow-hidden cursor-pointer">
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
      <div className="px-2.5 pt-2 pb-2 flex flex-col flex-grow">
        <h3 className="text-[#111] font-semibold text-[13px] leading-[18px] mb-1 line-clamp-2">
          {title}
        </h3>
        
        <div className="flex items-center gap-1 text-[10px] text-[#666] mb-1.5">
          <FaStar className="text-black" size={10} />
          <span className="text-black font-semibold">{rating}</span>
          <span>|</span>
          <span>{reviewsCount} reviews</span>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center gap-1 mb-2">
            <span className="text-[18px] font-bold text-[#111]">₹{price}</span>
            {originalPrice && (
              <span className="text-xs text-gray-500 line-through">₹{originalPrice}</span>
            )}
            {discount && (
              <Badge variant="discount">{discount}% OFF</Badge>
            )}
          </div>
          
          <button 
            onClick={() => requireAuth(() => addToCart(product))}
            className="w-full h-[36px] bg-[#e30613] hover:bg-[#c50011] text-white font-bold text-[12px] uppercase rounded-[4px]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};
