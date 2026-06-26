import React, { useState, useEffect } from 'react';
import { ProductCard } from '../ui/ProductCard';
import { dummyProducts } from '../../data/products';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 13,
    seconds: 51
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          return { hours: 24, minutes: 0, seconds: 0 };
        }
        
        let h = prev.hours;
        let m = prev.minutes;
        let s = prev.seconds - 1;

        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }

        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashSaleProducts = dummyProducts.filter(product => product.isDealOfDay);

  const TimeBox = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center bg-white text-black w-14 h-16 md:w-16 md:h-20 rounded-sm">
      <span className="text-xl md:text-2xl font-bold text-[#cc0000]">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[10px] md:text-xs font-semibold text-[#cc0000] uppercase">
        {label}
      </span>
    </div>
  );

  return (
    <section className="py-16 bg-[#0a0a0a] border-t border-b border-[#1f1f1f]">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="flex flex-col items-center justify-center mb-10 gap-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Limited time Offer
          </h2>
          
          <div className="flex items-center gap-2 md:gap-4">
            <TimeBox value={timeLeft.hours} label="Hour" />
            <span className="text-white text-2xl font-bold mb-4">:</span>
            <TimeBox value={timeLeft.minutes} label="Min" />
            <span className="text-white text-2xl font-bold mb-4">:</span>
            <TimeBox value={timeLeft.seconds} label="Sec" />
          </div>
        </div>

        <div 
          className="flex gap-3 overflow-x-auto pb-6 snap-x snap-mandatory custom-scrollbar scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {flashSaleProducts.map((product, index) => (
            <div key={`${product.id}-${index}`} className="w-[180px] md:w-[260px] snap-start flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
