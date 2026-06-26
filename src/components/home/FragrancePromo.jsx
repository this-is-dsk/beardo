import React from 'react';
import { Link } from 'react-router-dom';

export const FragrancePromo = () => {
  return (
    <section className="py-12 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 lg:px-8">
        <Link 
          to="/collections/perfumes" 
          className="block relative bg-[#111] rounded-2xl overflow-hidden border border-[#222] hover:border-[#444] transition-all group"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-black"></div>
          
          <div className="relative flex flex-col md:flex-row items-center h-full">
            
            {/* Text Content */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center md:items-start text-center md:text-left z-10 order-2 md:order-1">
              <span className="text-gray-400 font-semibold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-3">
                Complete Grooming Solution
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight leading-none">
                Luxury<br className="hidden md:block" /> Fragrances
              </h2>
              <button className="bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold py-3 px-8 text-sm uppercase tracking-wider transition-colors rounded-sm shadow-lg shadow-[#cc0000]/20">
                Shop Now
              </button>
            </div>

            {/* Image Content */}
            <div className="w-full md:w-1/2 relative h-64 md:h-[400px] order-1 md:order-2 flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 md:hidden"></div>
              <img 
                src="/images/luke.webp" 
                alt="Luxury Fragrances" 
                className="w-full h-full object-contain object-center drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 relative z-0"
              />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};
