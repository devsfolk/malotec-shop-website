'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAdminPassword } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { products, categories } from './mock-data';
import { writeData } from './mock-data-persisted';
import type { Product, Category } from './types';

function slugify(text: string) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
}

export async function login(password: string) {
  const adminPassword = getAdminPassword();
  if (password === adminPassword) {
    await cookies().set('malotec-admin-password', password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
    });
    redirect('/dmalo/dashboard');
  } else {
    return { error: 'Invalid password' };
  }
}

export async function logout() {
    await cookies().delete('malotec-admin-password');
    redirect('/dmalo');
}

export async function saveProduct(formData: FormData) {
    const id = formData.get('id') as string | null;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = Number(formData.get('price'));
    const categoryId = formData.get('categoryId') as string;
    const imageUrl = formData.get('imageUrl') as string;

    if (id) { // Update existing product
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], name, description, price, categoryId, imageUrl, slug: slugify(name) };
        }
    } else { // Add new product
        const newProduct: Product = {
            id: `prod-${Date.now()}`,
            name,
            slug: slugify(name),
            description,
            price,
            imageUrl: imageUrl || '',
            categoryId,
        };
        products.push(newProduct);
    }
    
    try {
        await writeData({ products, categories });
    } catch (e: any) {
        throw new Error(`Failed to write data: ${e.message}`);
    }

    revalidatePath('/dmalo/dashboard');
    revalidatePath('/', 'layout');
}

export async function deleteProduct(id: string) {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        await writeData({ products, categories });
    }
    revalidatePath('/dmalo/dashboard');
    revalidatePath('/', 'layout');
}

export async function saveCategory(formData: FormData) {
    const id = formData.get('id') as string | null;
    const name = formData.get('name') as string;
    const parentIdValue = formData.get('parentId') as string;
    const parentId = parentIdValue && parentIdValue !== 'null' ? parentIdValue : null;
    const imageUrl = formData.get('imageUrl') as string;

    if (id) { // Update existing category
        const index = categories.findIndex(c => c.id === id);
        if (index !== -1) {
            categories[index] = { ...categories[index], name, parentId, slug: slugify(name), imageUrl };
        }
    } else { // Add new category
        const newCategory: Category = {
            id: `cat-${Date.now()}`,
            name,
            slug: slugify(name),
            imageUrl: imageUrl || '',
            parentId,
        };
        categories.push(newCategory);
    }
    
    try {
        await writeData({ products, categories });
    } catch(e: any) {
        throw new Error(`Failed to write data: ${e.message}`);
    }
    
    revalidatePath('/dmalo/dashboard');
    revalidatePath('/', 'layout');
}

export async function deleteCategory(id: string) {
    const hasChildren = categories.some(c => c.parentId === id);
    if (hasChildren) {
        return { error: "Cannot delete category with sub-categories." };
    }

    const index = categories.findIndex(c => c.id === id);
    if (index !== -1) {
        categories.splice(index, 1);
        await writeData({ products, categories });
    }
    revalidatePath('/dmalo/dashboard');
    revalidatePath('/', 'layout');
}
