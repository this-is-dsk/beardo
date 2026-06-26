import React, { useEffect } from 'react';
import { ProductCard } from '../components/ui/ProductCard';
import { dummyProducts } from '../data/products';

const godfatherProducts = [
  {
    id: 101,
    title: 'Godfather Perfume EDP(100ml)',
    price: 699,
    originalPrice: 1200,
    discount: 41,
    rating: 4.8,
    reviewsCount: 224,
    image: '/images/101.webp'
  },
  {
    id: 102,
    title: 'Godfather Perfume Pack Of 2',
    price: 999,
    originalPrice: 2400,
    discount: 58,
    rating: 4.7,
    reviewsCount: 219,
    image: '/images/102.webp'
  },
  {
    id: 103,
    title: 'Godfather Everything Combo',
    price: 999,
    originalPrice: 2249,
    discount: 55,
    rating: 4.7,
    reviewsCount: 186,
    image: '/images/103.webp'
  },
  {
    id: 104,
    title: 'Bestselling Perfume Duo',
    price: 999,
    originalPrice: 2400,
    discount: 58,
    rating: 4.7,
    reviewsCount: 217,
    image: '/images/104.webp'
  },
  {
    id: 105,
    title: 'Godfather Perfume Combo For Men',
    price: 699,
    originalPrice: 1549,
    discount: 54,
    rating: 4.7,
    reviewsCount: 186,
    image: '/images/105.webp'
  },
  {
    id: 106,
    title: 'Bobby Godfather Signature Combo',
    price: 799,
    originalPrice: 1899,
    discount: 57,
    rating: 4.7,
    reviewsCount: 187,
    image: '/images/106.webp'
  },
  {
    id: 107,
    title: 'Power Combo',
    price: 1499,
    originalPrice: 2699,
    discount: 44,
    image: '/images/107.webp'
  },
  {
    id: 108,
    title: 'Godfather Perfume EDP(50ml)',
    price: 499,
    originalPrice: 699,
    discount: 28,
    rating: 4.7,
    reviewsCount: 191,
    image: '/images/108.webp'
  }
];

const saleBanner = "/images/godfather_banner.webp";

const GodfatherCollection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] py-12">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Sale Banner */}
<div className="mb-8 overflow-hidden rounded-lg">
  <img
    src={saleBanner}
    alt="End Of Summer Sale"
    className="w-full h-auto object-cover"
  />
</div>

{/* Sale Heading */}
<div className="mb-10">
  <h1 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-wider mb-2">
  BEARDO GODFATHER COLLECTION
</h1>
</div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
          {godfatherProducts.map((product) => (
            <div key={product.id} className="w-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GodfatherCollection;
