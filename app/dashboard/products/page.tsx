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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Boxes,
  FileSpreadsheet,
  ImageOff,
  LayoutGrid,
  MoreVertical,
  Package,
  Pencil,
  Search,
  Sparkles,
  Tag,
  Trash2,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const currency = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
}).format;

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // --- STATE FOR DELETION ---
  const [productToDelete, setProductToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // --- FIX: STATE FOR EDIT DIALOG ---
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<any | null>(null);

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const { data, isLoading } = useGetAllProductsQuery({
    searchTerm: search,
    page,
    limit: 10,
  });

  const products = data?.data ?? [];
  const meta = data?.meta;

  const currentProductsCount = products.length;

  const totalCategories = new Set(
    products.flatMap((p: any) =>
      Array.isArray(p.categories)
        ? p.categories.map((c: any) => c?._id || c)
        : [],
    ),
  ).size;

  const avgPrice = currentProductsCount
    ? Math.round(
        products.reduce((sum: number, p: any) => {
          const parsedPrice = parseFloat(p?.price);
          return sum + (isNaN(parsedPrice) ? 0 : parsedPrice);
        }, 0) / currentProductsCount,
      )
    : 0;

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

  // Helper helper to open edit state clean
  const openEditModal = (product: any) => {
    const photoUrl = product.photo || product.image || "";
    setProductToEdit({
      id: product._id,
      defaultValues: {
        name: product.name ?? "",
        description: product.description ?? "",
        price: product.price ?? "",
        brand: product.brand?.name ?? "",
        section: product.section?.name ?? "",
        type: product.type?.name ?? "",
        photo: photoUrl,
        categories: product.categories?.map((c: any) => c.name) ?? [],
      },
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-sky-100 bg-linear-to-r from-sky-50 via-white to-orange-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm shadow-sky-200">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
              Products
            </h2>
            <p className="text-sm text-slate-500">
              Manage your store&apos;s product catalog.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ImportProductsCSVDialog
            trigger={
              <Button
                variant="outline"
                className="flex-1 border-sky-200 text-sky-600 hover:bg-sky-50 hover:text-sky-700 sm:flex-none"
              >
                <FileSpreadsheet className="mr-1.5 h-4 w-4" />
                Import CSV
              </Button>
            }
          />

          {/* Creation Dialog (Trigger variant) */}
          <AddProductDialog
            trigger={
              <Button className="flex-1 bg-orange-500 text-white shadow-sm shadow-orange-200 hover:bg-orange-600 focus-visible:ring-orange-300 sm:flex-none">
                <Sparkles className="mr-1.5 h-4 w-4" />
                Add Product
              </Button>
            }
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-sky-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sky-500">
            <Boxes className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Total Products
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-800">
            {meta?.total ?? products.length}
          </p>
        </div>

        <div className="rounded-xl border border-sky-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sky-500">
            <Tag className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Categories (page)
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-800">
            {totalCategories}
          </p>
        </div>

        <div className="rounded-xl border border-orange-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-orange-500">
            <Wallet className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Avg. Price
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-800">
            {currency(avgPrice)}
          </p>
        </div>

        <div className="rounded-xl border border-orange-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-orange-500">
            <LayoutGrid className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Page
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-800">
            {meta?.page ?? page} / {meta?.totalPage ?? 1}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-full sm:max-w-sm">
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
        {!isLoading && (
          <p className="text-sm text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-600">
              {products.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-600">
              {meta?.total ?? products.length}
            </span>{" "}
            products
          </p>
        )}
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-xl border border-sky-100 bg-sky-50/60"
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && products.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-sky-200 bg-sky-50/40 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-sky-300 shadow-sm">
            <Package className="h-7 w-7" />
          </div>
          <div>
            <p className="font-semibold text-slate-700">
              {search ? "No matching products" : "No products yet"}
            </p>
            <p className="text-sm text-slate-400">
              {search
                ? `Nothing found for "${search}".`
                : "Add your first product to get started."}
            </p>
          </div>
        </div>
      )}

      {/* Desktop table */}
      {!isLoading && products.length > 0 && (
        <>
          <div className="hidden overflow-hidden rounded-xl border border-sky-100 shadow-sm md:block">
            <Table>
              <TableHeader>
                <TableRow className="bg-sky-50 hover:bg-sky-50">
                  <TableHead className="w-16 font-semibold text-sky-700">
                    #
                  </TableHead>
                  <TableHead className="font-semibold text-sky-700">
                    Product
                  </TableHead>
                  <TableHead className="font-semibold text-sky-700">
                    Brand
                  </TableHead>
                  <TableHead className="font-semibold text-sky-700 lg:table-cell hidden">
                    Section
                  </TableHead>
                  <TableHead className="font-semibold text-sky-700 lg:table-cell hidden">
                    Type
                  </TableHead>
                  <TableHead className="font-semibold text-sky-700">
                    Categories
                  </TableHead>
                  <TableHead className="font-semibold text-sky-700">
                    Price
                  </TableHead>
                  <TableHead className="text-right font-semibold text-sky-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {products.map((product: any, index: number) => {
                  const productPhotoUrl = product.photo || product.image;

                  return (
                    <TableRow
                      key={product._id}
                      className="transition-colors hover:bg-orange-50/50"
                    >
                      <TableCell className="text-slate-400">
                        {(page - 1) * 10 + index + 1}
                      </TableCell>

                      <TableCell className="font-medium text-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-sky-100 bg-sky-50">
                            {productPhotoUrl ? (
                              <Image
                                src={productPhotoUrl}
                                alt={product.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-sky-300">
                                <ImageOff className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                          <span className="max-w-45 truncate">
                            {product.name}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="text-slate-500">
                        {product.brand?.name ?? "—"}
                      </TableCell>

                      <TableCell className="text-slate-500 lg:table-cell hidden">
                        {product.section?.name ?? "—"}
                      </TableCell>

                      <TableCell className="text-slate-500 lg:table-cell hidden">
                        {product.type?.name ?? "—"}
                      </TableCell>

                      <TableCell>
                        {product.categories?.length ? (
                          <div className="flex max-w-45 flex-wrap gap-1">
                            {product.categories
                              .slice(0, 2)
                              .map((category: any) => (
                                <Badge
                                  key={category._id}
                                  variant="secondary"
                                  className="border-sky-200 bg-sky-50 text-sky-700"
                                >
                                  {category.name}
                                </Badge>
                              ))}
                            {product.categories.length > 2 && (
                              <Badge
                                variant="secondary"
                                className="border-orange-200 bg-orange-50 text-orange-700"
                              >
                                +{product.categories.length - 2}
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </TableCell>

                      <TableCell className="font-semibold text-slate-800">
                        {currency(product.price ?? 0)}
                      </TableCell>

                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-slate-400 hover:bg-sky-50 hover:text-sky-600"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-36">
                            <DropdownMenuItem
                              onClick={() => openEditModal(product)}
                              className="cursor-pointer text-sky-700 focus:bg-sky-50 focus:text-sky-700"
                            >
                              <Pencil className="mr-2 h-3.5 w-3.5" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                setProductToDelete({
                                  id: product._id,
                                  name: product.name,
                                })
                              }
                              className="cursor-pointer text-orange-700 focus:bg-orange-50 focus:text-orange-700"
                            >
                              <Trash2 className="mr-2 h-3.5 w-3.5" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
            {products.map((product: any) => {
              const productPhotoUrl = product.photo || product.image;

              return (
                <div
                  key={product._id}
                  className="rounded-xl border border-sky-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-sky-100 bg-sky-50">
                      {productPhotoUrl ? (
                        <Image
                          src={productPhotoUrl}
                          alt={product.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sky-300">
                          <ImageOff className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-slate-800">
                        {product.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {product.brand?.name ?? "—"}
                        {product.type?.name ? ` · ${product.type.name}` : ""}
                      </p>
                      <p className="mt-1 font-bold text-orange-600">
                        {currency(product.price ?? 0)}
                      </p>
                    </div>
                  </div>

                  {product.categories?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
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
                  )}

                  <div className="mt-3 flex items-center gap-2 border-t border-sky-50 pt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-sky-200 text-sky-600 hover:bg-sky-50"
                      onClick={() => openEditModal(product)}
                    >
                      <Pencil className="mr-1 h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
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
                </div>
              );
            })}
          </div>
        </>
      )}

      {meta && meta.totalPage > 1 && (
        <div className="flex justify-end">
          <PaginationComp
            currentPage={page}
            totalPages={meta.totalPage}
            onPageChange={setPage}
          />
        </div>
      )}

      {/* 
        ======================================================================
        FIXED HOISTED MODALS: Rendered clean outside table maps 
        ======================================================================
      */}

      {/* Programmatic Edit Dialog instance */}
      {productToEdit && (
        <AddProductDialog
          isEdit
          productId={productToEdit.id}
          defaultValues={productToEdit.defaultValues}
          open={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open);
            if (!open) setProductToEdit(null);
          }}
          key={productToEdit.id}
        />
      )}

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
