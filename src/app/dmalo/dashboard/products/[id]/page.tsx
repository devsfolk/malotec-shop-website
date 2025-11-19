
import { getProductById, getAllCategories } from "@/lib/mock-data";
import { AdminProductForm } from "@/components/admin/admin-product-form";
import { notFound } from "next/navigation";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type EditProductPageProps = {
    params: { id: string };
};


function EditProductClient({ params }: { params: { id: string } }) {
    const router = useRouter();
    
    const handleSave = () => {
        router.back();
    };
    
    if (params.id === 'new') {
        return <AdminProductForm categories={getAllCategories()} onSave={handleSave} />;
    }

    const product = getProductById(params.id);
    const categories = getAllCategories();

    if (!product) {
        return <p>Product not found.</p>;
    }

    return <AdminProductForm product={product} categories={categories} onSave={handleSave} />;
}


export default function EditProductPage({ params }: EditProductPageProps) {
    return <EditProductClient params={params} />;
}
