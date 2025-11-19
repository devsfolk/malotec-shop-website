
import { getCategoryById, getAllCategories } from "@/lib/mock-data";
import { AdminCategoryForm } from "@/components/admin/admin-category-form";
import { notFound } from "next/navigation";

type EditCategoryPageProps = {
    params: { id: string };
    onBack: () => void;
};

export default function EditCategoryPage({ params, onBack }: EditCategoryPageProps) {
  const allCategories = getAllCategories();
  
  const handleSave = () => {
    // Revalidation is handled in the server action
    onBack();
  }

  if (params.id === 'new') {
    return <AdminCategoryForm categories={allCategories} onSave={handleSave} />;
  }

  const category = getCategoryById(params.id);

  if (!category) {
    // This case will be handled by the layout's view rendering
    return <p>Category not found.</p>;
  }

  return <AdminCategoryForm category={category} categories={allCategories} onSave={handleSave} />;
}
