
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllCategories } from "@/lib/mock-data";
import { AdminCategoryList } from "@/components/admin/admin-category-list";
import { PlusCircle } from "lucide-react";


export default function AdminCategoriesPage() {
  const router = useRouter();
  const allCategories = getAllCategories();

  const handleAdd = () => {
      router.push('/dmalo/dashboard/categories/new');
  };

  const handleEdit = (id: string) => {
      router.push(`/dmalo/dashboard/categories/${id}`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle>Categories</CardTitle>
                <CardDescription>
                Manage your categories and subcategories.
                </CardDescription>
            </div>
            <Button onClick={handleAdd}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Category
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <AdminCategoryList categories={allCategories} onEdit={handleEdit} />
      </CardContent>
    </Card>
  );
}
