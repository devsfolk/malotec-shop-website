import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllProducts, getCategories } from "@/lib/mock-data";

type DashboardPageProps = {
    onNavigate: (view: 'products' | 'categories') => void;
};


export default function DashboardPage({ onNavigate }: DashboardPageProps) {
    const products = getAllProducts();
    const categories = getCategories(null);

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      >
        <div className="flex flex-col items-center gap-1 text-center p-8">
          <h3 className="text-2xl font-bold tracking-tight">
            Welcome to your Dashboard
          </h3>
          <p className="text-muted-foreground">
            Manage your store's products and categories.
          </p>
          <div className="mt-4 flex flex-col md:flex-row gap-4">
              <Card>
                <CardHeader>
                    <CardTitle>{products.length}</CardTitle>
                    <CardDescription>Products</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button size="sm" onClick={() => onNavigate('products')}>
                        Manage Products
                    </Button>
                </CardContent>
              </Card>
               <Card>
                <CardHeader>
                    <CardTitle>{categories.length}</CardTitle>
                    <CardDescription>Categories</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button size="sm" onClick={() => onNavigate('categories')}>
                        Manage Categories
                    </Button>
                </CardContent>
              </Card>
          </div>
        </div>
      </div>
    </>
  );
}
