
'use client';

import { useState } from 'react';
import { CircleUser, Home, LayoutGrid, LogOut, Menu, Package, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/actions";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import DashboardPage from './page';
import AdminProductsPage from './products/page';
import AdminCategoriesPage from './categories/page';
import EditProductPage from './products/[id]/page';
import EditCategoryPage from './categories/[id]/page';

export type View = 
  | { name: 'dashboard' }
  | { name: 'products'; id?: string }
  | { name: 'categories'; id?: string };


const links = [
    { name: 'dashboard', label: 'Dashboard', icon: Home },
    { name: 'products', label: 'Products', icon: Package },
    { name: 'categories', label: 'Categories', icon: LayoutGrid },
];


export default function DashboardLayout() {
  const [view, setView] = useState<View>({ name: 'dashboard' });

  const handleNavClick = (newViewName: View['name']) => {
    setView({ name: newViewName });
  }
  
  const handleEditClick = (viewName: 'products' | 'categories', id: string) => {
    setView({ name: viewName, id });
  }

  const handleBackClick = () => {
    if ('id' in view) {
      handleNavClick(view.name);
    }
  }
  
  const renderView = () => {
    switch (view.name) {
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavClick} />;
      case 'products':
        if (view.id) {
          return <EditProductPage params={{ id: view.id }} onBack={() => handleNavClick('products')} />;
        }
        return <AdminProductsPage onEdit={(id) => handleEditClick('products', id)} onAdd={() => handleEditClick('products', 'new')} />;
      case 'categories':
        if (view.id) {
          return <EditCategoryPage params={{ id: view.id }} onBack={() => handleNavClick('categories')} />;
        }
        return <AdminCategoriesPage onEdit={(id) => handleEditClick('categories', id)} onAdd={() => handleEditClick('categories', 'new')} />;
      default:
        return <DashboardPage onNavigate={handleNavClick} />;
    }
  }
  
  const isFormView = 'id' in view && !!view.id;


  const AdminNav = ({ inSheet = false }: { inSheet?: boolean }) => (
     <nav className={cn("grid items-start gap-2", inSheet ? 'text-lg font-medium' : 'px-2 text-sm font-medium lg:px-4')}>
      {links.map(({ name, label, icon: Icon }) => (
        <Button
          key={name}
          variant={view.name === name && !isFormView ? "secondary" : "ghost"}
          className="justify-start gap-2"
          onClick={() => handleNavClick(name as View['name'])}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </Button>
      ))}
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-background md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
             <button onClick={() => handleNavClick('dashboard')} className="flex items-center gap-2 font-semibold">
              <span>malotec.shop Admin</span>
            </button>
          </div>
          <div className="flex-1">
             <AdminNav />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                <span>malotec.shop Admin</span>
              </div>
              <nav className="grid gap-2 text-lg font-medium">
                <AdminNav inSheet />
              </nav>
            </SheetContent>
          </Sheet>

          <div className="w-full flex-1">
            {isFormView && (
                 <Button variant="outline" size="sm" onClick={handleBackClick} className="h-8">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to {view.name}
                </Button>
            )}
           </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <form action={logout}>
                <DropdownMenuItem asChild>
                  <button type="submit" className="w-full text-left">
                    <LogOut className="mr-2 h-4 w-4 inline" />
                    <span>Logout</span>
                  </button>
                </DropdownMenuItem>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
