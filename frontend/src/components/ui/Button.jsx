import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  fullWidth = false,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold transition-colors duration-300 rounded";
  
  const variants = {
    primary: "bg-[#cc0000] text-white hover:bg-[#aa0000]",
    outline: "border-2 border-[#cc0000] text-[#cc0000] hover:bg-[#cc0000] hover:text-white",
    ghost: "text-gray-300 hover:text-white hover:bg-gray-800",
  };

  const sizes = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };

  const classes = twMerge(
    clsx(
      baseClasses,
      variants[variant],
      sizes[size],
      fullWidth && "w-full",
      className
    )
  );

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.button>
  );
};
