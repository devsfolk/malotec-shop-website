
import { getCategoryById, getAllCategories } from "@/lib/mock-data";
import { AdminCategoryForm } from "@/components/admin/admin-category-form";
import { notFound } from "next/navigation";
import { useRouter } from 'next/navigation';

type EditCategoryPageProps = {
    params: { id: string };
};

function EditCategoryClient({ params }: { params: { id: string } }) {
    const router = useRouter();
    const allCategories = getAllCategories();
    
    const handleSave = () => {
        router.back();
    };

    if (params.id === 'new') {
        return <AdminCategoryForm categories={allCategories} onSave={handleSave} />;
    }

    const category = getCategoryById(params.id);

    if (!category) {
        return <p>Category not found.</p>;
    }

    return <AdminCategoryForm category={category} categories={allCategories} onSave={handleSave} />;
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
    return <EditCategoryClient params={params} />;
}
