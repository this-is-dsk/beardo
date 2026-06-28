import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const products = [
{
id: 201,
title: 'Don Beardo Beard Growth Pro Kit',
price: 999,
originalPrice: 1636,
discount: 39,
rating: 4.61,
reviewsCount: 574,
image: '/images/444.webp'
}
];

const BeardGrowthKit = () => {
const { addToCart } = useCart();
const { requireAuth } = useAuth();
useEffect(() => {
window.scrollTo(0, 0);
}, []);

return ( <div className="min-h-screen bg-white py-6 text-white">

  <div className="container mx-auto px-4 max-w-6xl">

    {/* Product Title */}
    <h1 className="text-2xl md:text-4xl font-extrabold uppercase mb-3">
      DON BEARDO'S BEARD GROWTH PRO KIT
    </h1>

    {/* Rating */}
    <div className="flex items-center gap-3 mb-6">
  <span className="bg-green-600 px-2 py-1 rounded text-sm font-bold">
    ⭐ 4.61
  </span>
  <span className="text-gray-400">
    574 Reviews
  </span>
</div>

    {/* Main Product Banner */}
    <img
  src="/images/444.webp"
  alt="Beard Growth Kit"
  className="w-full rounded-xl object-cover"
/>

    {/* Price */}
    <div className="mb-8 flex items-center gap-3 flex-wrap">

  <span className="text-4xl font-bold text-white">
  ₹{amount || 0}
  </span>

  <span className="text-xl text-gray-500 line-through">
    ₹1636
  </span>

  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
    39% OFF
  </span>

</div>

<button
  onClick={() =>
    requireAuth(() =>
      addToCart({
        id: 201,
        title: 'Don Beardo Beard Growth Pro Kit',
        price: 999,
        image: '/images/444.webp'
      })
    )
  }
  className="w-full md:w-auto bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold px-10 py-4 rounded-lg uppercase tracking-wider transition-colors mb-10"
>
  Add To Cart
</button>

    {/* Why Choose Us */}
    <div className="bg-[#181818] rounded-2xl p-6 mb-8 border border-[#2a2a2a]">

      <h2 className="text-3xl font-bold mb-5 text-white">
  WHY CHOOSE US
</h2>

      <div className="space-y-4">
        <p>✓ Made for Men</p>
        <p>✓ Complete Grooming Solution</p>
        <p>✓ Real Products. Real Results.</p>
        <p>✓ For Everyday Hustle</p>
        <p>✓ Unapologetically Masculine</p>
      </div>

    </div>

    {/* Images Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">

  <img
    src="/images/why1.jpg"
    alt="why1"
    className="w-full rounded-xl object-cover"
  />

  <img
    src="/images/why2.webp"
    alt="why2"
    className="w-full rounded-xl object-cover"
  />

  <img
    src="/images/why3.jpg"
    alt="why3"
    className="w-full rounded-xl object-cover md:col-span-2"
  />

</div>
<div className="bg-[#181818] rounded-2xl p-6 border border-[#2a2a2a]">

  <h3 className="text-2xl font-bold mb-4">
    What's Inside The Kit?
  </h3>

  <ul className="space-y-3 text-gray-300">
    <li>✓ Beard Growth Oil</li>
    <li>✓ Beard Growth Roller</li>
    <li>✓ Beard Wash</li>
    <li>✓ Beard Comb</li>
  </ul>

</div>
  </div>

</div>

);
};

export default BeardGrowthKit;
