
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllCategories } from "@/lib/mock-data";
import { AdminCategoryList } from "@/components/admin/admin-category-list";
import { PlusCircle } from "lucide-react";

type AdminCategoriesPageProps = {
    onEdit: (id: string) => void;
    onAdd: () => void;
};


export default function AdminCategoriesPage({ onEdit, onAdd }: AdminCategoriesPageProps) {
  const allCategories = getAllCategories();

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
            <Button onClick={onAdd}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Category
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <AdminCategoryList categories={allCategories} onEdit={onEdit} />
      </CardContent>
    </Card>
  );
}
