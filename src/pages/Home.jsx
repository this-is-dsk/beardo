import React from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { ShopByCategory } from '../components/home/ShopByCategory';
import { FlashSale } from '../components/home/FlashSale';
import { FragrancePromo } from '../components/home/FragrancePromo';
import { TopSellers } from '../components/home/TopSellers';
import { ExploreCollections } from '../components/home/ExploreCollections';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { CustomerReviews } from '../components/home/CustomerReviews';

export default function Home() {
  return (
    <div className="w-full">
      <HeroBanner />
      <ShopByCategory />
      <FlashSale />
      <FragrancePromo />
      <TopSellers />
      <ExploreCollections />
      <WhyChooseUs />
      
      {/* Video Banner Placeholder */}
      <section className="relative w-full h-[60vh] bg-black overflow-hidden flex items-center justify-center">
         {/* Muted background video would go here */}
         <div className="absolute inset-0 bg-[#0a0a0a] bg-opacity-60 flex flex-col items-center justify-center z-10 text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wider">Unleash Your Vibe</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">Premium grooming essentials for the modern man. Join the revolution.</p>
            <button className="bg-[#cc0000] text-white px-8 py-3 text-lg font-bold uppercase tracking-widest hover:bg-[#aa0000] transition-colors duration-300">
               Discover More
            </button>
         </div>
      </section>

      <CustomerReviews />

      {/* Instagram Feed Placeholder */}
      <section className="py-16 bg-[#0f0f0f]">
        <div className="container mx-auto px-4 lg:px-8">
           <div className="mb-10">
  <img
    src="/images/about.webp"
    alt="Beardo Code"
    className="w-full rounded-lg"
  />
</div>
        </div>
      </section>
    </div>
  );
}
