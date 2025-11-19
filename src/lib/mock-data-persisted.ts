'use server';

import fs from 'fs/promises';
import path from 'path';
import type { Product, Category } from './types';

const dataPath = path.join(process.cwd(), 'src', 'lib', 'mock-data-persisted.json');

// This is a server-side only utility to persist the mock data changes.
// It is NOT suitable for production use.
export async function writeData({ products, categories }: { products: Product[], categories: Category[] }) {
  try {
    const data = {
      categories,
      products,
    };
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Failed to write persisted data:", error);
    // In a real app, you'd handle this more gracefully.
    throw new Error("Failed to save data to the file system.");
  }
}
