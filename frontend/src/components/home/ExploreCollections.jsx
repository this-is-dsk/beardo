import React, { useState, useRef, useEffect } from 'react';
import { ProductCard } from '../ui/ProductCard';
import { dummyProducts } from '../../data/products';

export const ExploreCollections = () => {
  const [activeTab, setActiveTab] = useState('Trimmers');
  const scrollContainerRef = useRef(null);

  const tabs = [
    { id: 'Face', label: 'FACE' },
    { id: 'Hair', label: 'HAIR' },
    { id: 'Body', label: 'BODY' },
  ];

  // Filter products by checking if the title contains the tab word (simple simulation)
  const filteredProducts = dummyProducts.filter(
    (product) => product.title.toLowerCase().includes(activeTab.toLowerCase())
  );

  // Fallback to top-sellers if empty
  const displayProducts = filteredProducts.length > 0 
    ? filteredProducts 
    : dummyProducts.filter(p => p.category === 'top-sellers');

  // Reset scroll position smoothly when tab changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  return (
    <section className="py-8 md:py-16 bg-[#efefef]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 className="text-[28px] md:text-3xl font-bold text-[#111] mb-4 uppercase tracking-wider text-center">
            Explore More Collections
          </h2>
          
          <div className="flex overflow-x-auto w-full max-w-full gap-2 pb-2 custom-scrollbar justify-start md:justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 border whitespace-nowrap text-[13px] font-semibold uppercase tracking-wider transition-colors duration-300 rounded-sm flex-shrink-0 ${
                  activeTab === tab.id 
                    ? 'bg-[#111] text-white border-[#111]' 
                    : 'bg-white text-[#666] border-[#ddd]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto pb-6 snap-x snap-mandatory custom-scrollbar scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {displayProducts.map((product, index) => (
            <div key={`${product.id}-${index}`} className="w-[150px] md:w-[240px] snap-start flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
