import React from 'react';
import { Link } from 'react-router-dom';
import { IoChevronForward } from 'react-icons/io5';
import { shopByCategories } from '../../data/categories';

export const ShopByCategory = () => {
  return (
    <section className="py-12 md:py-16 bg-[#f6f6f6]">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#111] mb-10 text-center">
          Shop By Category
        </h2>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-7xl mx-auto">
          {shopByCategories.map((category) => (
            <Link 
              key={category.id} 
              to={category.path}
              className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#444] transition-all aspect-[4/5] sm:aspect-square shadow-sm hover:shadow-xl"
            >
              <div className="absolute inset-0 p-2 flex justify-center items-start">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-[82%] h-[72%] object-contain object-top drop-shadow-xl group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full bg-white p-4 flex justify-between items-center">
                <span className="text-[#111] font-bold text-sm md:text-base leading-tight">
                  {category.name}
                </span>
                <div className="w-6 h-6 rounded-full bg-[#f2f2f2] flex items-center justify-center text-[#111] backdrop-blur-sm group-hover:bg-[#cc0000] transition-colors">
                  <IoChevronForward size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link 
            to="/shop-all" 
            className="w-full md:w-auto px-8 py-3 bg-[#111] hover:bg-[#cc0000] text-white font-bold rounded-full transition-all duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};
