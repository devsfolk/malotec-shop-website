
'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Category } from "@/lib/types";
import { saveCategory } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { ImageUploader } from "./image-uploader";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  parentId: z.string().optional(),
  imageUrl: z.string().min(1, "An image URL or upload is required."),
});

type AdminCategoryFormProps = {
    category?: Category;
    categories: Category[];
    onSave: () => void;
}

export function AdminCategoryForm({ category, categories, onSave }: AdminCategoryFormProps) {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: category?.name || "",
          parentId: category?.parentId || undefined,
          imageUrl: category?.imageUrl || "",
        },
    });

    const isSubmitting = form.formState.isSubmitting;
    const pageTitle = category ? "Edit Category" : "Add New Category";
    const pageDescription = category ? "Update the details of this category." : "Fill in the details for the new category.";
    const buttonText = category ? "Save Changes" : "Create Category";

    async function handleSaveCategory(data: z.infer<typeof formSchema>) {
        const formData = new FormData();
        if (category) {
            formData.append('id', category.id);
        }
        formData.append('name', data.name);
        formData.append('parentId', data.parentId || 'null');
        formData.append('imageUrl', data.imageUrl);

        try {
            await saveCategory(formData);
            toast({
                title: `Category ${category ? 'Updated' : 'Created'}`,
                description: `The category has been successfully ${category ? 'updated' : 'created'}.`,
            });
            onSave();
        } catch (e: any) {
             toast({
                variant: 'destructive',
                title: `Failed to ${category ? 'update' : 'create'} category`,
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
                    <form onSubmit={form.handleSubmit(handleSaveCategory)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category Image</FormLabel>
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
                                    <FormLabel>Category Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. iPhones" {...field} disabled={isSubmitting}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="parentId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Parent Category (Optional)</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a parent category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="null">None (Main Category)</SelectItem>
                                            {categories
                                                .filter(c => c.id !== category?.id && !c.parentId) // prevent self-parenting and deep nesting
                                                .map((cat) => (
                                                    <SelectItem key={cat.id} value={cat.id}>
                                                        {cat.name}
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
