/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useGetAllSectionsQuery } from "@/redux/features/sections/section.auth";
import { Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { useGetAllBrandsQuery } from "@/redux/features/brand/brand.auth";
import { useGetAllTypesQuery } from "@/redux/features/types/types.auth";
import { useGetAllCategoriesQuery } from "@/redux/features/categories/categories.auth";
import { useAddProductMutation, useUpdateProductMutation } from "@/redux/features/products/products.auth";

export type ProductFormValues = {
  name: string;
  brand: string;
  section: string;
  type: string;
  categories: string[];
};

type OptionItem = { value: string; label: string };

type AddProductDialogProps = {
  isEdit?: boolean;
  productId?: string;
  defaultValues?: ProductFormValues;
  trigger: React.ReactNode;
};

export default function AddProductDialog({
  isEdit = false,
  productId,
  defaultValues,
  trigger,
}: AddProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [categoryPickerValue, setCategoryPickerValue] = useState("");

  const { data: brandsRes, isLoading: brandsLoading } =
    useGetAllBrandsQuery(undefined);
  const { data: sectionsRes, isLoading: sectionsLoading } =
    useGetAllSectionsQuery(undefined);
  const { data: typesRes, isLoading: typesLoading } =
    useGetAllTypesQuery(undefined);
  const { data: categoriesRes, isLoading: categoriesLoading } =
    useGetAllCategoriesQuery(undefined);

  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] =
    useUpdateProductMutation();

  const isSubmitting = isAdding || isUpdating;

  const brandOptions: OptionItem[] =
    brandsRes?.data?.map((item: { _id: string; name: string }) => ({
      value: item.name,
      label: item.name,
    })) ?? [];

  const sectionOptions: OptionItem[] =
    sectionsRes?.data?.map((item: { _id: string; name: string }) => ({
      value: item.name,
      label: item.name,
    })) ?? [];

  const typeOptions: OptionItem[] =
    typesRes?.data?.map((item: { _id: string; name: string }) => ({
      value: item.name,
      label: item.name,
    })) ?? [];

  const categoryOptions: OptionItem[] =
    categoriesRes?.data?.map((item: { _id: string; name: string }) => ({
      value: item.name,
      label: item.name,
    })) ?? [];

  const form = useForm<ProductFormValues>({
    defaultValues: defaultValues ?? {
      name: "",
      brand: "",
      section: "",
      type: "",
      categories: [],
    },
  });

  const { control, setValue, reset } = form;
  const selectedCategories = useWatch({ control, name: "categories" }) ?? [];

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next && defaultValues) {
      reset(defaultValues);
    }
    if (!next) {
      setCategoryPickerValue("");
    }
  };

  const handleAddCategory = (value: string) => {
    if (!value) return;
    if (selectedCategories.includes(value)) {
      setCategoryPickerValue("");
      return;
    }
    setValue("categories", [...selectedCategories, value]);
    setCategoryPickerValue("");
  };

  const handleRemoveCategory = (value: string) => {
    setValue(
      "categories",
      selectedCategories.filter((c) => c !== value),
    );
  };

  const onSubmit = async (values: ProductFormValues) => {
    try {
      if (isEdit && productId) {
        await updateProduct({ id: productId, productData: values }).unwrap();
        toast.success("Product updated successfully!");
      } else {
        await addProduct(values).unwrap();
        toast.success("Product added successfully!");
        reset({ name: "", brand: "", section: "", type: "", categories: [] });
      }
      setOpen(false);
    } catch (error: any) {
      toast.error(
        error?.data?.message ??
          `An error occurred while ${isEdit ? "updating" : "adding"} the product.`,
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="product-form"
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Name */}
            <FormField
              control={control}
              name="name"
              rules={{ required: "Product name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Air Max 90" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand */}
            <FormField
              control={control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={brandsLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brandOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Section */}
            <FormField
              control={control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={sectionsLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a section" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sectionOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type */}
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={typesLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typeOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Categories — multi-select via repeated single-select + badges */}
            <FormField
              control={control}
              name="categories"
              render={() => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <Select
                    onValueChange={handleAddCategory}
                    value={categoryPickerValue}
                    disabled={categoriesLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Add a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryOptions
                        .filter((item) => !selectedCategories.includes(item.value))
                        .map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  {selectedCategories.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedCategories.map((category) => (
                        <Badge
                          key={category}
                          variant="secondary"
                          className="gap-1 border-sky-200 bg-sky-50 text-sky-700"
                        >
                          {category}
                          <button
                            type="button"
                            onClick={() => handleRemoveCategory(category)}
                            className="ml-0.5 rounded-full hover:text-orange-600"
                            aria-label={`Remove ${category}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            form="product-form"
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            {isSubmitting ? (
              "Saving..."
            ) : (
              <>
                <Sparkles className="mr-1.5 h-4 w-4" />
                Save Product
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}