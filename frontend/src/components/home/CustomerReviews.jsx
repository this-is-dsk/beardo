import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';

const reviews = [
  {
    id: 1,
    productName: 'Beard and Hair Growth Oil',
    reviewer: 'Pratik, 32 years old',
    content: '"Beardo Beard & Hair Growth Oil" is an exceptional product that delivers on its promises. This 50ml bottle of natural hair oil is designed to promote thicker and longer beard growth, making it an excellent choice for those struggling with uneven, patchy, or slow beard growth.'
  },
  {
    id: 2,
    productName: 'Godfather Perfume For Men',
    reviewer: 'Sanket, 24 years old',
    content: 'This perfume hits you with a bold, masculine, and long-lasting aroma that instantly turns heads. The first spray gives off a strong, rich blend of musky and woody notes — powerful yet smooth, like a true "boss" vibe. As it settles, it leaves behind a warm, sophisticated trail that feels both intense and classy.'
  },
  {
    id: 3,
    productName: 'Man Curls Curly Hair Styler',
    reviewer: 'Manthan, 29 years old',
    content: 'I\'ve been using the Men\'s Curly Hair Cream for a few weeks now, and I\'m absolutely loving it! As a guy with curly hair, I\'ve struggled to find a product that keeps my curls moisturized, defined, and manageable. This cream has exceeded my expectations in every way.'
  },
  {
    id: 4,
    productName: 'De-Tan Face Wash',
    reviewer: 'Rahul, 27 years old',
    content: 'Awesome product. It actually helps in removing tan if used regularly. The coffee scent is very refreshing in the morning. Best face wash for men!'
  }
];

export const CustomerReviews = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <div className="flex space-x-2 text-[#cc0000] mb-6">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={32} />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-medium tracking-widest text-white uppercase">
            10000+ 5-STAR REVIEWS
          </h2>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="pb-16"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-black border border-gray-800 rounded-2xl p-8 flex flex-col h-full hover:border-gray-600 transition-colors duration-300">
                <p className="text-gray-400 text-sm leading-relaxed flex-grow text-center mb-8">
                  {review.content}
                </p>
                
                <div className="flex items-center justify-center w-full mb-6">
                  <div className="h-[1px] bg-gray-700 w-1/4"></div>
                  <div className="w-2 h-2 rotate-45 bg-gray-500 mx-2"></div>
                  <div className="h-[1px] bg-gray-700 w-1/4"></div>
                </div>
                
                <div className="text-center">
                  <h4 className="text-white font-bold text-lg mb-1">{review.productName}</h4>
                  <span className="text-gray-500 text-sm">{review.reviewer}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
