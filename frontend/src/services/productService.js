import { dummyProducts } from '../data/products';

/**
 * Product Service
 * Acts as an abstraction layer over the static dummy data.
 * When the backend is ready, replace these implementations with Axios/fetch calls
 * to /api/products. The UI components calling these methods won't need to change.
 */

export const getProducts = async () => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyProducts);
    }, 300); // 300ms mock delay
  });
};

export const getProductById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = dummyProducts.find(p => p.id === id);
      if (product) {
        resolve(product);
      } else {
        reject(new Error('Product not found'));
      }
    }, 200);
  });
};

export const getProductsByCategory = async (categoryKeyword) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = dummyProducts.filter(p => 
        p.title.toLowerCase().includes(categoryKeyword.toLowerCase()) || 
        p.category.toLowerCase().includes(categoryKeyword.toLowerCase())
      );
      resolve(filtered);
    }, 200);
  });
};
