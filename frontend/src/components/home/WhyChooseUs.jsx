import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { FiUser, FiShoppingBag, FiMessageSquare, FiShield } from 'react-icons/fi';

const features = [
  {
    id: 1,
    icon: <FiUser size={32} />,
    title: 'Made for Men',
    description: "Beardo creates grooming products designed specifically for men's skin, hair, and daily needs, no unisex shortcuts, no compromises."
  },
  {
    id: 2,
    icon: <FiShoppingBag size={32} />,
    title: 'Complete Grooming Solution',
    description: 'From skincare to haircare to styling essentials, Beardo gives you a complete grooming routine in one place, simple, effective, and built for men.'
  },
  {
    id: 3,
    icon: <FiMessageSquare size={32} />,
    title: 'Real Products. Real Results.',
    description: "We don't oversell or overclaim. Beardo delivers straightforward grooming solutions that work the way men actually want them to."
  },
  {
    id: 4,
    icon: <FiShield size={32} />,
    title: 'For Every Concern',
    description: 'Whether it\'s oily skin, patchy beard, or styling control, we address your everyday concerns with targeted products.'
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading 
          subtitle="DESIGNED WITH PURPOSE"
          title="Why Choose Us"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="relative bg-black border border-gray-800 rounded-xl p-8 flex flex-col items-center text-center overflow-hidden group hover:border-gray-600 transition-colors duration-300"
            >
              {/* Red Corner Accent */}
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#cc0000] rotate-45 transform origin-center opacity-80 group-hover:scale-110 transition-transform duration-300"></div>

              <div className="text-[#cc0000] mb-6">
                {feature.icon}
              </div>
              
              <div className="flex items-center justify-center w-full mb-6">
                <div className="h-[1px] bg-gray-700 w-1/4"></div>
                <div className="w-2 h-2 rotate-45 bg-gray-500 mx-2"></div>
                <div className="h-[1px] bg-gray-700 w-1/4"></div>
              </div>

              <h3 className="text-white font-bold text-lg mb-4">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
