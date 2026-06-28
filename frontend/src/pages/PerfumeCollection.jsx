import React, { useEffect } from 'react';
import { ProductCard } from '../components/ui/ProductCard';
import { dummyProducts } from '../data/products';

const PerfumeCollection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const perfumeProducts = dummyProducts.filter(p => 
    p.title.toLowerCase().includes('perfume') || 
    p.title.toLowerCase().includes('edp') ||
    p.title.toLowerCase().includes('spray')
  );

  const displayProducts = perfumeProducts.length > 0 ? perfumeProducts : dummyProducts;

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-wider mb-2">
            Beardo Luxury Perfume Range
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Long-lasting Premium Fragrances
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
          {displayProducts.map((product) => (
            <div key={product.id} className="w-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerfumeCollection;
