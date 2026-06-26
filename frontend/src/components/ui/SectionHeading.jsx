import React from 'react';

export const SectionHeading = ({ 
  title, 
  subtitle, 
  tabs = [], 
  activeTab, 
  onTabChange 
}) => {
  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-4 mb-2">
      {subtitle && (
        <span className="text-xs text-gray-400 tracking-[0.2em] uppercase mb-2">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
        {title}
      </h2>
      
      {tabs.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange && onTabChange(tab.id)}
              className={`px-3 py-1.5 border text-[13px] font-semibold uppercase tracking-wider transition-colors duration-300 ${
                activeTab === tab.id 
                  ? 'bg-[#cc0000] text-white border-[#cc0000]' 
                  : 'bg-[#111] text-gray-300 hover:bg-[#222] border-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
