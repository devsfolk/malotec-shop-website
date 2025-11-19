
'use client';
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Category } from "@/lib/types";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteCategory } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

type AdminCategoryListProps = {
    categories: Category[];
    onEdit: (id: string) => void;
}

export function AdminCategoryList({ categories: initialCategories, onEdit }: AdminCategoryListProps) {
    const { toast } = useToast();
    const [categories, setCategories] = useState(initialCategories);
    
    const handleDelete = async (categoryId: string) => {
        // Optimistically update UI
        const previousCategories = categories;
        setCategories(categories.filter(c => c.id !== categoryId));

        const result = await deleteCategory(categoryId);

        if (result?.error) {
            // Revert on error
            setCategories(previousCategories);
            toast({
                variant: "destructive",
                title: "Error",
                description: result.error,
            });
        } else {
            toast({
                title: "Category Deleted",
                description: "The category has been successfully deleted.",
            });
        }
    }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[64px]">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Type</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => {
            const parent = category.parentId ? categories.find(c => c.id === category.parentId) : null;
            return (
                <TableRow key={category.id}>
                    <TableCell>
                       {category.imageUrl && <Image
                            alt={category.name}
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={category.imageUrl}
                            width="64"
                            data-ai-hint={category.imageHint}
                        />}
                    </TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                        {parent ? (
                            <Badge variant="outline">Sub-category of {parent.name}</Badge>
                        ) : (
                            <Badge variant="secondary">Main Category</Badge>
                        )}
                    </TableCell>
                    <TableCell>
                        <AlertDialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => onEdit(category.id)}>Edit</DropdownMenuItem>
                                    <AlertDialogTrigger asChild>
                                        <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this category.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(category.id)} className="bg-destructive hover:bg-destructive/90">
                                    Delete
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </TableCell>
                </TableRow>
            )
        })}
      </TableBody>
    </Table>
  );
}
