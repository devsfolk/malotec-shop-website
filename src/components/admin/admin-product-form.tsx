
'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Product, Category } from "@/lib/types";
import { saveProduct } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { ImageUploader } from "./image-uploader";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  price: z.coerce.number().min(1, "Price is required."),
  categoryId: z.string().min(1, "Category is required."),
  imageUrl: z.string().min(1, "An image URL or upload is required."),
});

type AdminProductFormProps = {
    product?: Product;
    categories: Category[];
    onSave: () => void;
}

export function AdminProductForm({ product, categories, onSave }: AdminProductFormProps) {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: product?.name || "",
          description: product?.description || "",
          price: product?.price || 0,
          categoryId: product?.categoryId || "",
          imageUrl: product?.imageUrl || "",
        },
    });

    const isSubmitting = form.formState.isSubmitting;
    const pageTitle = product ? "Edit Product" : "Add New Product";
    const pageDescription = product ? "Update the details of this product." : "Fill in the details for the new product.";
    const buttonText = product ? "Save Changes" : "Create Product";

    async function handleSaveProduct(data: z.infer<typeof formSchema>) {
        const formData = new FormData();
        if (product) {
            formData.append('id', product.id);
        }
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', String(data.price));
        formData.append('categoryId', data.categoryId);
        formData.append('imageUrl', data.imageUrl);

        try {
            await saveProduct(formData);
            toast({
                title: `Product ${product ? 'Updated' : 'Created'}`,
                description: `The product has been successfully ${product ? 'updated' : 'created'}.`,
            });
            onSave();
        } catch (e: any) {
             toast({
                variant: 'destructive',
                title: `Failed to ${product ? 'update' : 'create'} product`,
                description: e.message || "An unknown error occurred.",
            });
        }
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>{pageTitle}</CardTitle>
                <CardDescription>{pageDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSaveProduct)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Image</FormLabel>
                                    <FormControl>
                                        <ImageUploader 
                                            value={field.value} 
                                            onChange={field.onChange}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. iPhone 15 Pro" {...field} disabled={isSubmitting}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="A short description of the product." {...field} disabled={isSubmitting}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price (Rs)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g. 350000" {...field} disabled={isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : buttonText}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
