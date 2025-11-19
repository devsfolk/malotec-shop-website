
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllProducts } from "@/lib/mock-data";
import { AdminProductList } from "@/components/admin/admin-product-list";
import { PlusCircle } from "lucide-react";


export default function AdminProductsPage() {
    const router = useRouter();
    const products = getAllProducts();
    
    const handleAdd = () => {
        router.push('/dmalo/dashboard/products/new');
    };

    const handleEdit = (id: string) => {
        router.push(`/dmalo/dashboard/products/${id}`);
    };
    
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
            <Button onClick={handleAdd}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Product
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <AdminProductList products={products} onEdit={handleEdit} />
      </CardContent>
    </Card>
  );
}
