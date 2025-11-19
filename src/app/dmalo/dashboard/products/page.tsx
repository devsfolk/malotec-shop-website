
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllProducts } from "@/lib/mock-data";
import { AdminProductList } from "@/components/admin/admin-product-list";
import { PlusCircle } from "lucide-react";

type AdminProductsPageProps = {
    onEdit: (id: string) => void;
    onAdd: () => void;
};


export default function AdminProductsPage({ onEdit, onAdd }: AdminProductsPageProps) {
    const products = getAllProducts();
    
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                Manage your products here. Add, edit, or remove them.
                </CardDescription>
            </div>
            <Button onClick={onAdd}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Product
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <AdminProductList products={products} onEdit={onEdit} />
      </CardContent>
    </Card>
  );
}
