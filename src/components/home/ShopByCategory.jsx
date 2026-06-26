import React from 'react';
import { Link } from 'react-router-dom';
import { IoChevronForward } from 'react-icons/io5';
import { shopByCategories } from '../../data/categories';

export const ShopByCategory = () => {
  return (
    <section className="py-10 bg-[#0f0f0f]">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wider text-center">
          Shop By Category
        </h2>
        
        <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto">
          {shopByCategories.map((category) => (
            <Link 
              key={category.id} 
              to={category.path}
              className="group relative flex flex-col bg-gradient-to-b from-[#222] to-[#111] rounded-2xl overflow-hidden border border-[#2a2a2a] hover:border-[#444] transition-all aspect-[4/5] sm:aspect-square"
            >
              <div className="absolute inset-0 p-2 flex justify-center items-start">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-[85%] h-[75%] object-contain object-top drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-3 flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-white font-bold text-sm md:text-base leading-tight">
                  {category.name}
                </span>
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-[#cc0000] transition-colors">
                  <IoChevronForward size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link 
            to="/shop-all" 
            className="w-full md:w-auto px-8 py-3 bg-[#1a1a1a] border border-[#333] hover:border-[#cc0000] hover:bg-[#cc0000] text-white font-bold text-sm tracking-wider uppercase transition-colors rounded-sm text-center"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};
