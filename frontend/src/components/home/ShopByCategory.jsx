import React from 'react';
import { Link } from 'react-router-dom';
import { IoChevronForward } from 'react-icons/io5';
import { shopByCategories } from '../../data/categories';

export const ShopByCategory = () => {
  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-[30px] md:text-[38px] font-black tracking-[-0.02em] text-[#111] text-center mb-8 md:mb-10">
          Shop By Category
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-[1380px] mx-auto">
          {shopByCategories.map((category) => (
            <Link 
              key={category.id} 
              to={category.path}
              className="group relative overflow-hidden rounded-[18px] aspect-[0.78] bg-[#f4f4f4]"
            >
              <div className="absolute inset-0">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-4 pb-4 pt-10 flex items-end justify-between">
                <span className="text-white text-[15px] md:text-[16px] font-bold leading-tight">
                  {category.name}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                  <IoChevronForward size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link 
            to="/shop-all" 
            className="inline-flex items-center justify-center h-[50px] px-8 rounded-full bg-black hover:bg-[#cc0000] text-white text-[15px] font-semibold transition-all duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};
