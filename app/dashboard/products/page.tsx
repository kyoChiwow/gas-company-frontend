/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PaginationComp from "@/components/general/PaginationComp";
import AddProductDialog from "@/components/modules/products/AddProduct";
import ImportProductsCSVDialog from "@/components/modules/products/CsvDialog";
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
import { Badge } from "@/components/ui/badge";
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
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/products/products.auth";

import {
  FileSpreadsheet,
  Package,
  Pencil,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [productToDelete, setProductToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const { data, isLoading } = useGetAllProductsQuery({
    searchTerm: search,
    page,
    limit: 10,
  });

  const products = data?.data ?? [];
  const meta = data?.meta;

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete.id).unwrap();
      toast.success("Product deleted successfully!");
    } catch (error: any) {
      toast.error(
        error?.data?.message ?? "An error occurred while deleting the product.",
      );
    } finally {
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-sky-100 bg-linear-to-r from-sky-50 via-white to-orange-50 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm shadow-sky-200">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Products</h2>
            <p className="text-sm text-slate-500">
              Manage all available products.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ImportProductsCSVDialog
            trigger={
              <Button
                variant="outline"
                className="border-sky-200 text-sky-600 hover:bg-sky-50 hover:text-sky-700"
              >
                <FileSpreadsheet className="mr-1.5 h-4 w-4" />
                Import CSV
              </Button>
            }
          />

          <AddProductDialog
            trigger={
              <Button className="bg-orange-500 text-white shadow-sm shadow-orange-200 hover:bg-orange-600 focus-visible:ring-orange-300">
                <Sparkles className="mr-1.5 h-4 w-4" />
                Add Product
              </Button>
            }
          />
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />
        <Input
          placeholder="Search product..."
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
                Brand
              </TableHead>
              <TableHead className="font-semibold text-sky-700">
                Section
              </TableHead>
              <TableHead className="font-semibold text-sky-700">Type</TableHead>
              <TableHead className="font-semibold text-sky-700">
                Categories
              </TableHead>
              <TableHead className="text-right font-semibold text-sky-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center">
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
                    Loading products...
                  </span>
                </TableCell>
              </TableRow>
            ) : products.length ? (
              products.map((product: any, index: number) => (
                <TableRow
                  key={product._id}
                  className="transition-colors hover:bg-orange-50/50"
                >
                  <TableCell className="text-slate-400">{index + 1}</TableCell>

                  <TableCell className="font-medium text-slate-800">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                      {product.name}
                    </span>
                  </TableCell>

                  <TableCell className="text-slate-500">
                    {product.brand?.name ?? "—"}
                  </TableCell>

                  <TableCell className="text-slate-500">
                    {product.section?.name ?? "—"}
                  </TableCell>

                  <TableCell className="text-slate-500">
                    {product.type?.name ?? "—"}
                  </TableCell>

                  <TableCell>
                    {product.categories?.length ? (
                      <div className="flex max-w-55 flex-wrap gap-1">
                        {product.categories.map((category: any) => (
                          <Badge
                            key={category._id}
                            variant="secondary"
                            className="border-sky-200 bg-sky-50 text-sky-700"
                          >
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-2">
                      <AddProductDialog
                        isEdit
                        productId={product._id}
                        defaultValues={{
                          name: product.name,
                          brand: product.brand?.name ?? "",
                          section: product.section?.name ?? "",
                          type: product.type?.name ?? "",
                          categories:
                            product.categories?.map((c: any) => c.name) ?? [],
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
                      />

                      <Button
                        variant="destructive"
                        size="sm"
                        className="bg-orange-100 text-orange-700 hover:bg-orange-200 shadow-none"
                        onClick={() =>
                          setProductToDelete({
                            id: product._id,
                            name: product.name,
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
                <TableCell colSpan={7} className="py-10 text-center">
                  <div className="flex flex-col items-center gap-1.5 text-slate-400">
                    <Package className="h-6 w-6 text-sky-300" />
                    <span className="text-sm">No products found.</span>
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
        open={!!productToDelete}
        onOpenChange={(open) => {
          if (!open) setProductToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-medium text-slate-700">
                {productToDelete?.name}
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={handleDeleteProduct}
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
