import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Link } from 'react-router-dom';
import { link } from 'framer-motion/client';

const slides = [
  {
    id: 1,
    imageDesktop: '/images/hero-slide-1.webp',
    imageMobile: '/images/hero1.webp',
    heading: 'BUY 2 GET 2\nFREE SALE',
    buttonText: 'SHOP NOW',
    link: '/shop-all'
  },
  {
    id: 2,
    imageDesktop: '/images/hero-slide-2.webp',
    imageMobile: '/images/hero-slide-2-mobile.webp',
    title: 'EXCLUSIVE',
    heading: 'Whisky Day Sale',
    buttonText: 'SHOP NOW',
    link: '/collections/perfumes'
  },
  {
    id: 3,
    imageDesktop: '/images/hero-slide-4.webp',
    imageMobile: '/images/hero-slide-4-mobile.webp',
    heading: 'The Godfather\nReturns',
    buttonText: 'SHOP NOW',
    link: '/godfather-collection'
  },
  {
    id: 4,
    imageDesktop: '/images/hero-slide-3.webp',
    imageMobile: '/images/hero-slide-3-mobile.webp',
    title: 'BEARD GROWTH CHALLENGE',
    heading: 'TAKE THE 30 DAYS\nCHALLENGE',
    buttonText: 'SHOP NOW',
    link: '/beard-growth-kit'
  },
  {
    id: 5,
    imageDesktop: '/images/hero-slide-5.webp',
    imageMobile: '/images/hero-slide-5-mobile.webp',
    heading: 'Combo That Keeps Selling Out Fast',
    buttonText: 'DISCOVER',
    link: '/shop-all'
  }
];

export const HeroBanner = () => {
  return (
    <div className="relative w-full h-[398px] md:h-[82vh] bg-white overflow-hidden">
      <Swiper
  modules={[Autoplay, Pagination]}
  allowTouchMove={true}
  simulateTouch={true}
  grabCursor={true}
  touchStartPreventDefault={false}
  preventClicks={false}
  preventClicksPropagation={false}
  autoplay={{
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  }}
  pagination={{
    clickable: true,
  }}
  loop={true}
  className="w-full h-full hero-swiper"
>
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex flex-col justify-end pb-8 md:pb-0 md:justify-center overflow-hidden md:rounded-[18px]">
              
              {/* Z-0: Background Image Layer */}
              <picture className="absolute inset-0 z-0">
                <source media="(max-width: 767px)" srcSet={slide.imageMobile} />
                <source media="(min-width: 768px)" srcSet={slide.imageDesktop} />
                <img 
                  src={slide.imageDesktop} 
                  alt={slide.heading.replace(/<[^>]+>/g, '')}
                  className="w-full h-full object-cover object-[76%_center] md:object-center"
                />
              </picture>
              
              {/* Z-10: Overlay Layer (Gradient for text readability) */}
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/10
via-transparent
to-transparent"></div>

              {/* Z-20: Text Content Layer */}
              <div className="
relative
z-20
w-full
md:w-[36%]
flex
flex-col
justify-end
md:justify-center
px-8
pb-10
md:px-16
">
                {slide.title && (
                  <span className="inline-block bg-white text-[#cc0000] font-bold tracking-wider text-[10px] md:text-sm uppercase px-3 py-1 md:px-4 md:py-1.5 rounded-full mb-4 w-max shadow-sm">
                    {slide.title}
                  </span>
                )}
                
                <h1 className="text-[22px] md:text-[58px] lg:text-[64px] font-extrabold text-white mb-5 leading-[1.0] whitespace-pre-line tracking-tight uppercase">
                  {slide.heading}
                </h1>

                <div>
                  <div>
  {slide.link ? (
  <Link
    to={slide.link}
    className="bg-[#cc0000] hover:bg-[#aa0000] text-white font-extrabold py-4 px-12 md:py-3.5 md:px-10 text-sm md:text-base uppercase tracking-wider transition-colors rounded-lg shadow-lg shadow-[#cc0000]/20 w-max inline-block"
  >
    {slide.buttonText}
  </Link>
) : (
  <button
    className="bg-[#cc0000] hover:bg-[#aa0000] text-white font-extrabold py-4 px-10 md:py-3.5 md:px-10 text-sm md:text-base uppercase tracking-wider transition-colors rounded-md shadow-lg shadow-[#cc0000]/20 w-max"
  >
    {slide.buttonText}
  </button>
)}
</div>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style dangerouslySetInnerHTML={{__html: `
        .hero-swiper .swiper-pagination{

bottom:18px!important;

}

.hero-swiper .swiper-pagination-bullet{

width:10px;

height:10px;

border-radius:999px;

background:#d3d3d3;

opacity:1;

margin:0 5px!important;

transition:.3s;

}

.hero-swiper .swiper-pagination-bullet-active{

background:white;

}
      `}} />
    </div>
  );
};
