/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PaginationComp from "@/components/general/PaginationComp";
import NameDescriptionDialog, {
  NameDescriptionFormValues,
} from "@/components/modules/products/NameDescriptionForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAddCategoriesMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/redux/features/categories/categories.auth";
import { FolderTree, Pencil, Search, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type CategoryFormValues = {
  name: string;
  description: string;
};

export default function Categories() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [addCategories] = useAddCategoriesMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const { data, isLoading } = useGetAllCategoriesQuery({
    searchTerm: search,
    page,
    limit: 10,
  });

  const categories = data?.data ?? [];
  const meta = data?.meta;

  const handleAddCategory = async (values: CategoryFormValues) => {
    try {
      await addCategories(values).unwrap();
      toast.success("Category added successfully!");
    } catch (error: any) {
      toast.error(
        error?.data?.message ?? "An error occurred while adding the category.",
      );
    }
  };

  const handleUpdateCategory = async (
    categoryId: string,
    values: NameDescriptionFormValues,
  ) => {
    try {
      await updateCategory({
        id: categoryId,
        categoryData: values,
      }).unwrap();
      toast.success("Category updated successfully!");
    } catch (error: any) {
      toast.error(
        error?.data?.message ??
          "An error occurred while updating the category.",
      );
    }
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteCategory(categoryToDelete.id).unwrap();
      toast.success("Category deleted successfully!");
    } catch (error: any) {
      toast.error(
        error?.data?.message ??
          "An error occurred while deleting the category.",
      );
    } finally {
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-sky-100 bg-linear-to-r from-sky-50 via-white to-orange-50 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm shadow-sky-200">
            <FolderTree className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Categories</h2>
            <p className="text-sm text-slate-500">
              Manage all available categories.
            </p>
          </div>
        </div>

        <NameDescriptionDialog
          entityName="Category"
          trigger={
            <Button className="bg-orange-500 text-white shadow-sm shadow-orange-200 hover:bg-orange-600 focus-visible:ring-orange-300">
              <Sparkles className="mr-1.5 h-4 w-4" />
              Add Category
            </Button>
          }
          onSubmit={handleAddCategory}
        />
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />
        <Input
          placeholder="Search category..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border-sky-200 pl-9 focus-visible:border-sky-400 focus-visible:ring-sky-200"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-sky-100 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-sky-50 hover:bg-sky-50">
              <TableHead className="w-16 font-semibold text-sky-700">
                #
              </TableHead>
              <TableHead className="font-semibold text-sky-700">Name</TableHead>
              <TableHead className="font-semibold text-sky-700">
                Description
              </TableHead>
              <TableHead className="font-semibold text-sky-700">
                Created At
              </TableHead>
              <TableHead className="text-right font-semibold text-sky-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center">
                  <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-sky-400" />
                    <span
                      className="h-2 w-2 animate-pulse rounded-full bg-sky-400"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="h-2 w-2 animate-pulse rounded-full bg-orange-400"
                      style={{ animationDelay: "300ms" }}
                    />
                    Loading categories...
                  </span>
                </TableCell>
              </TableRow>
            ) : categories.length ? (
              categories.map((category: any, index: number) => (
                <TableRow
                  key={category._id}
                  className="transition-colors hover:bg-orange-50/50"
                >
                  <TableCell className="text-slate-400">{index + 1}</TableCell>

                  <TableCell className="font-medium text-slate-800">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                      {category.name}
                    </span>
                  </TableCell>

                  <TableCell className="max-w-xs truncate text-slate-500">
                    {category.description}
                  </TableCell>

                  <TableCell className="text-slate-500">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-2">
                      <NameDescriptionDialog
                        entityName="Category"
                        isEdit
                        loading={isUpdating}
                        defaultValues={{
                          name: category.name,
                          description: category.description,
                        }}
                        trigger={
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-sky-200 text-sky-600 hover:bg-sky-50 hover:text-sky-700"
                          >
                            <Pencil className="mr-1 h-3.5 w-3.5" />
                            Edit
                          </Button>
                        }
                        onSubmit={(values) =>
                          handleUpdateCategory(category._id, values)
                        }
                      />

                      <Button
                        variant="destructive"
                        size="sm"
                        className="bg-orange-100 text-orange-700 hover:bg-orange-200 shadow-none"
                        onClick={() =>
                          setCategoryToDelete({
                            id: category._id,
                            name: category.name,
                          })
                        }
                      >
                        <Trash2 className="mr-1 h-3.5 w-3.5" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center">
                  <div className="flex flex-col items-center gap-1.5 text-slate-400">
                    <FolderTree className="h-6 w-6 text-sky-300" />
                    <span className="text-sm">No categories found.</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {meta && meta.totalPage > 1 && (
          <div className="flex justify-end">
            <PaginationComp
              currentPage={page}
              totalPages={meta.totalPage}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!categoryToDelete}
        onOpenChange={(open) => {
          if (!open) setCategoryToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete category</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-medium text-slate-700">
                {categoryToDelete?.name}
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={handleDeleteCategory}
              className="bg-orange-500 text-white hover:bg-orange-600 focus-visible:ring-orange-300"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
