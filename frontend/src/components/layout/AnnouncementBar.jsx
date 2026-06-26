import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "₹199 Each - Mix & Match Any 4 | Shop Now →",
  "FREE SHIPPING ON ORDERS OVER ₹500",
  "NEW ARRIVALS: CHECK OUT THE LATEST SUMMER COLLECTION"
];

export const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  
};
