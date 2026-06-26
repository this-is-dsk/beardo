import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/ui/ProductCard';
import { dummyProducts } from '../data/products';

const categoryData = {
  beard: {
    title: 'BEARD',
    banner: '/images/beard_banner.webp',
    tabs: [
      'BEARD GROWTH',
      'BEARD STYLING',
      'BEARD COLOR',
      'BEARD TOOLS'
    ]
  },

  fragrance: {
    title: 'FRAGRANCE',
    banner: '/images/fragrance_banner.webp',
    tabs: [
      'EDP',
      'COMBOS',
      'LUXE COLLECTION'
    ]
  },

  body: {
    title: 'BODY',
    banner: '/images/body_banner.webp',
    tabs: [
      'BODY WASH',
      'SOAP',
      'HAIR REMOVAL'
    ]
  },

  face: {
    title: 'FACE',
    banner: '/images/face_banner.webp',
    tabs: [
      'FACE WASH',
      'SUNSCREEN',
      'SCRUBS & MASKS'
    ]
  },

  hair: {
    title: 'HAIR',
    banner: '/images/hair_banner.webp',
    tabs: [
      'WAX',
      'SPRAY',
      'OIL'
    ]
  },

  electronics: {
    title: 'ELECTRONICS',
    banner: '/images/electronics_banner.webp',
    tabs: [
      'TRIMMERS',
      'DRYERS'
    ]
  }
};

const CategoryPage = () => {
  const { categoryId } = useParams();
const filteredProducts = dummyProducts.filter(
  (product) => product.category?.includes(categoryId)
);
  const category =
    categoryData[categoryId] || categoryData.beard;

  return (
    <div className="min-h-screen bg-[#0f0f0f] py-8">

      <div className="container mx-auto px-4 lg:px-8">

        {/* Banner */}
        <div className="mb-8 overflow-hidden rounded-xl">
          <img
            src={category.banner}
            alt={category.title}
            className="w-full rounded-xl"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-white uppercase mb-8">
          {category.title}
        </h1>

        {/* Products Placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

  {filteredProducts.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
    />
  ))}

</div>

      </div>

    </div>
  );
};

export default CategoryPage;