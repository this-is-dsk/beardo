import React, { useState, useRef, useEffect } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { ProductCard } from '../ui/ProductCard';
import { dummyProducts } from '../../data/products';

export const TopSellers = () => {
  const [activeTab, setActiveTab] = useState('top-sellers');
  const scrollContainerRef = useRef(null);

  const tabs = [
    { id: 'top-sellers', label: 'TOP SELLERS' },
    { id: 'trending', label: 'TRENDING' },
    { id: 'new', label: 'NEW LAUNCH' },
  ];

  const filteredProducts = dummyProducts.filter(
    (product) => product.category === activeTab
  );

  // Reset scroll position smoothly when tab changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  return (
    <section className="py-16 bg-[#0f0f0f]">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading 
          title="Top Sellers & New Arrivals"
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div 
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto mt-6 pb-6 snap-x snap-mandatory custom-scrollbar scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {filteredProducts.map((product, index) => (
            <div key={`${product.id}-${index}`} className="w-[180px] md:w-[260px] snap-start flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
