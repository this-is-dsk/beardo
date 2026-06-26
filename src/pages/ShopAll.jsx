import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ui/ProductCard';
import { dummyProducts } from '../data/products';

const saleBanner = "/images/dopedo.webp";

const ShopAll = () => {
  const [searchParams] = useSearchParams();

const urlSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = useMemo(() => {

  const search = (searchTerm || urlSearch).toLowerCase();

  return dummyProducts.filter(product =>
    product.title.toLowerCase().includes(search)
  );

}, [searchTerm, urlSearch]);
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
<div className="mb-8">

  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full bg-[#181818] border border-[#333] rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-[#cc0000] outline-none"
  />

</div>
<div className="mb-10">
  <h1 className="text-2xl md:text-4xl font-extrabold text-white uppercase leading-tight">
    END OF SUMMER SALE – BUY 2 GET 2 FREE
  </h1>

  <p className="text-gray-400 mt-2">
    Add any 4 products and unlock Buy 2 Get 2 Free offer
  </p>
</div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="w-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopAll;
