import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Badge = ({
  children,
  className,
  variant = 'deal', // deal or discount
}) => {
  const baseClasses = "inline-block px-2 py-1 text-xs font-bold uppercase tracking-wider";
  
  const variants = {
    deal: "bg-[#cc0000] text-white",
    discount: "text-[#cc0000]",
  };

  return (
    <span className={twMerge(clsx(baseClasses, variants[variant], className))}>
      {children}
    </span>
  );
};
