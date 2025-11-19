import type { Category, Product } from '@/lib/types';
import placeholderImages from './placeholder-images.json';
import persistedData from './mock-data-persisted.json';

const placeholderImagesData = placeholderImages.default;
const persistedProducts = persistedData.products;
const persistedCategories = persistedData.categories;

const getImageData = (id: string) => placeholderImagesData.find((img: any) => img.id === id);

// Use the persisted data
export const categories: Category[] = persistedCategories;
export const products: Product[] = persistedProducts;


// Helper functions to query mock data
export const getCategories = (parentId: string | null = null) => {
  return categories.filter(c => c.parentId === parentId);
};

export const getCategoryById = (id: string) => {
    return categories.find(c => c.id === id);
}

export const getCategoryBySlug = (slug: string) => {
  return categories.find(c => c.slug === slug);
};

export const getProductsByCategory = (categoryId: string) => {
  const allCategoryIds = [categoryId, ...categories.filter(c => c.parentId === categoryId).map(c => c.id)];
  return products.filter(p => allCategoryIds.includes(p.categoryId));
};

export const getProductBySlug = (slug: string) => {
  return products.find(p => p.slug === slug);
};

export const getProductById = (id: string) => {
    return products.find(p => p.id === id);
}

export const getAllProducts = () => {
  return products;
}

export const getAllCategories = () => {
    return categories;
}

export const getImage = (id: string) => {
    return placeholderImagesData.find((img: any) => img.id === id);
}
