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
    <div className="flex flex-col items-center justify-center bg-[#111] text-white w-12 h-14 md:w-16 md:h-20 rounded-md">
      <span className="text-lg md:text-2xl font-bold text-white">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[9px] md:text-xs font-medium text-white uppercase">
        {label}
      </span>
    </div>
  );

  return (
    <section className="py-10 md:py-16 bg-[#efefef]">
      <div className="container mx-auto px-3 md:px-4 lg:px-8">
        
        <div className="flex flex-col items-center justify-center mb-8 gap-4 text-center">
          <h2 className="text-[28px] md:text-4xl font-extrabold text-[#111]">
            Limited time Offer
          </h2>
          
          <div className="flex items-center gap-2 md:gap-4">
            <TimeBox value={timeLeft.hours} label="Hour" />
            <span className="text-[#111] text-xl font-bold mb-3">:</span>
            <TimeBox value={timeLeft.minutes} label="Min" />
            <span className="text-[#111] text-xl font-bold mb-3">:</span>
            <TimeBox value={timeLeft.seconds} label="Sec" />
          </div>
        </div>

        <div 
          className="flex gap-3 overflow-x-auto pb-6 snap-x snap-mandatory custom-scrollbar scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {flashSaleProducts.map((product, index) => (
            <div key={`${product.id}-${index}`} className="w-[170px] md:w-[260px] snap-start flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
