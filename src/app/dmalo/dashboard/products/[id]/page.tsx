
import { getProductById, getAllCategories } from "@/lib/mock-data";
import { AdminProductForm } from "@/components/admin/admin-product-form";
import { notFound } from "next/navigation";

type EditProductPageProps = {
    params: { id: string };
    onBack: () => void;
};


export default function EditProductPage({ params, onBack }: EditProductPageProps) {
  
  const handleSave = () => {
    // Revalidation is handled in the server action
    onBack();
  }
  
  if (params.id === 'new') {
    return <AdminProductForm categories={getAllCategories()} onSave={handleSave} />;
  }

  const product = getProductById(params.id);
  const categories = getAllCategories();

  if (!product) {
    // This case will be handled by the layout's view rendering
    return <p>Product not found.</p>;
  }

  return <AdminProductForm product={product} categories={categories} onSave={handleSave} />;
}
