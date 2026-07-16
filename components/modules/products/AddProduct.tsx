/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useGetAllSectionsQuery } from "@/redux/features/sections/section.auth";
import {
  Sparkles,
  X,
  ImagePlus,
  Loader2,
  UploadCloud,
  Tag as TagIcon,
  Info,
  Layers,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { useGetAllBrandsQuery } from "@/redux/features/brand/brand.auth";
import { useGetAllTypesQuery } from "@/redux/features/types/types.auth";
import { useGetAllCategoriesQuery } from "@/redux/features/categories/categories.auth";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "@/redux/features/products/products.auth";
import Image from "next/image";
import { useGetSignatureQuery } from "@/redux/features/upload/upload.auth";

export type ProductFormValues = {
  name: string;
  description: string;
  price: string;
  brand: string;
  section: string;
  type: string;
  categories: string[];
  photo?: string;
};

type OptionItem = { value: string; label: string };

function mapDefaultValues(raw: any): ProductFormValues {
  if (!raw) {
    return {
      name: "",
      description: "",
      price: "",
      brand: "",
      section: "",
      type: "",
      categories: [],
      photo: "",
    };
  }
  return {
    name: raw.name ?? "",
    description: raw.description ?? "",
    price: raw.price ? String(raw.price) : "",
    brand: raw.brand?.name || raw.brand || "",
    section: raw.section?.name || raw.section || "",
    type: raw.type?.name || raw.type || "",
    categories: Array.isArray(raw.categories)
      ? raw.categories.map((c: any) => c?.name || c)
      : [],
    photo: raw.photo || raw.image || "",
  };
}

type ProductFormContentProps = {
  isEdit: boolean;
  productId?: string;
  defaultValues?: any;
  brandOptions: OptionItem[];
  sectionOptions: OptionItem[];
  typeOptions: OptionItem[];
  categoryOptions: OptionItem[];
  signatureRes: any;
  refetchSignature: () => Promise<any>;
  addProduct: ReturnType<typeof useAddProductMutation>[0];
  updateProduct: ReturnType<typeof useUpdateProductMutation>[0];
  isAdding: boolean;
  isUpdating: boolean;
  isUploadingImage: boolean;
  setIsUploadingImage: (val: boolean) => void;
  onClose: () => void;
};

function ProductFormContent({
  isEdit,
  productId,
  defaultValues,
  brandOptions,
  sectionOptions,
  typeOptions,
  categoryOptions,
  signatureRes,
  refetchSignature,
  addProduct,
  updateProduct,
  isAdding,
  isUpdating,
  isUploadingImage,
  setIsUploadingImage,
  onClose,
}: ProductFormContentProps) {
  const [categoryPickerValue, setCategoryPickerValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fallbackDefaults = mapDefaultValues(defaultValues);

  // Lazy initializer — computed once on mount, no effect required.
  const form = useForm<ProductFormValues>({
  defaultValues: fallbackDefaults,
  values: fallbackDefaults,     
});

  const { control, setValue } = form;
  const selectedCategories = useWatch({ control, name: "categories" }) ?? [];
  const savedPhoto = useWatch({ control, name: "photo" });
  const displayImage = previewUrl || savedPhoto;

  const isSubmitting = isAdding || isUpdating || isUploadingImage;

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const stageFile = (file: File | undefined | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    stageFile(e.target.files?.[0]);
    e.target.value = "";
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl("");
    setValue("photo", "", { shouldDirty: true });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    stageFile(e.dataTransfer.files?.[0]);
  };

  const uploadStagedImage = async (): Promise<string> => {
    if (!selectedFile) return savedPhoto || "";

    const sigData =
      signatureRes?.data || (await refetchSignature()).data?.data;

    if (!sigData) {
      throw new Error("Cloudinary credentials signature could not be verified.");
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("api_key", sigData.apiKey);
    formData.append("timestamp", sigData.timestamp.toString());
    formData.append("signature", sigData.signature);
    formData.append("folder", "products");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${sigData.cloudName}/image/upload`,
      { method: "POST", body: formData },
    );

    const data = await res.json();

    if (!data.secure_url) {
      throw new Error(data?.error?.message || "Upload operation failed.");
    }

    return data.secure_url as string;
  };

  const handleAddCategory = (val: string) => {
    if (!val) return;
    if (selectedCategories.includes(val)) {
      setCategoryPickerValue("");
      return;
    }
    setValue("categories", [...selectedCategories, val]);
    setCategoryPickerValue("");
  };

  const handleRemoveCategory = (val: string) => {
    setValue(
      "categories",
      selectedCategories.filter((c) => c !== val),
    );
  };

  const onSubmit = async (values: ProductFormValues) => {
    try {
      let photoUrl = values.photo;

      if (selectedFile) {
        setIsUploadingImage(true);
        photoUrl = await uploadStagedImage();
        setIsUploadingImage(false);
      }

      const payload = { ...values, photo: photoUrl };

      if (isEdit && productId) {
        await updateProduct({ id: productId, productData: payload }).unwrap();
        toast.success("Product updated successfully!");
      } else {
        await addProduct(payload).unwrap();
        toast.success("Product added successfully!");
      }
      onClose();
    } catch (error: any) {
      setIsUploadingImage(false);
      toast.error(
        error?.message ||
          error?.data?.message ||
          `An error occurred while ${isEdit ? "updating" : "adding"} the product.`,
      );
    }
  };

  return (
    <Form {...form}>
      <form
        id="product-form"
        className="space-y-6 px-6 py-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* --- Media Section --- */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <ImagePlus className="h-3.5 w-3.5 text-sky-500" />
            Product Photo
          </div>

          <div
            onClick={() => !isUploadingImage && fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`group relative flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed p-4 transition-colors ${
              isDragging
                ? "border-orange-400 bg-orange-50"
                : "border-sky-200 bg-sky-50/40 hover:border-sky-300 hover:bg-sky-50"
            }`}
          >
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-sky-100 bg-white shadow-sm">
              {displayImage ? (
                <Image
                  src={displayImage}
                  alt="Product preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <ImagePlus className="h-7 w-7 text-sky-300" />
              )}

              {isUploadingImage && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                  <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
                </div>
              )}

              {displayImage && !isUploadingImage && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900/70 text-white hover:bg-orange-500"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                <UploadCloud className="h-4 w-4 text-sky-500" />
                {selectedFile ? "Ready to upload" : "Click or drag an image"}
              </p>
              <p className="mt-0.5 truncate text-xs text-slate-400">
                {selectedFile
                  ? `${selectedFile.name} — will upload when you save`
                  : "PNG or JPG, up to 5MB. Nothing is uploaded until you save."}
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onClick={(e) => e.stopPropagation()}
              onChange={handleFileInputChange}
              disabled={isUploadingImage}
              className="hidden"
            />
          </div>
        </div>

        {/* --- Basic Info Section --- */}
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <Info className="h-3.5 w-3.5 text-sky-500" />
            Basic Information
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <FormField
                control={control}
                name="name"
                rules={{ required: "Product name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="iPhone 15 Pro"
                        className="rounded-xl border-sky-100 focus-visible:border-sky-400 focus-visible:ring-sky-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={control}
                name="price"
                rules={{ required: "Price is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="120000"
                        className="rounded-xl border-sky-100 focus-visible:border-sky-400 focus-visible:ring-sky-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product details..."
                    className="resize-none rounded-xl border-sky-100 focus-visible:border-sky-400 focus-visible:ring-sky-200"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* --- Categorization Section --- */}
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <Layers className="h-3.5 w-3.5 text-orange-500" />
            Categorization
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={control}
              name="brand"
              rules={{ required: "Brand selection is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl border-sky-100">
                        <SelectValue placeholder="Select Brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brandOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="section"
              rules={{ required: "Section selection is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl border-sky-100">
                        <SelectValue placeholder="Select Section" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sectionOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={control}
              name="type"
              rules={{ required: "Type selection is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl border-sky-100">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typeOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Categories</FormLabel>
              <Select
                onValueChange={handleAddCategory}
                value={categoryPickerValue}
              >
                <FormControl>
                  <SelectTrigger className="rounded-xl border-sky-100">
                    <SelectValue placeholder="Add Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoryOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          </div>

          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 rounded-xl border border-sky-100 bg-sky-50/50 p-3">
              <TagIcon className="mr-1 h-4 w-4 shrink-0 self-center text-sky-400" />
              {selectedCategories.map((cat) => (
                <Badge
                  key={cat}
                  variant="secondary"
                  className="gap-1 border-sky-200 bg-white text-sky-700 hover:bg-white"
                >
                  {cat}
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(cat)}
                    className="rounded-full p-0.5 text-sky-400 hover:bg-sky-50 hover:text-sky-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full rounded-xl bg-linear-to-r from-orange-500 to-orange-400 text-white shadow-sm shadow-orange-200 hover:from-orange-600 hover:to-orange-500"
          >
            {isUploadingImage ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading image...
              </>
            ) : isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving changes...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                {isEdit ? "Update Product" : "Save Product"}
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

/* ---------------------------------------------------------------------- */
/* Outer dialog shell — owns `open` state, data fetching, and mutations.  */
/* ---------------------------------------------------------------------- */
type AddProductDialogProps = {
  isEdit?: boolean;
  productId?: string;
  defaultValues?: any;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function AddProductDialog({
  isEdit = false,
  productId,
  defaultValues,
  trigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: AddProductDialogProps) {
  const [localOpen, setLocalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : localOpen;
  const setOpen = isControlled ? controlledOnOpenChange : setLocalOpen;

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const { data: brandsRes } = useGetAllBrandsQuery(undefined);
  const { data: sectionsRes } = useGetAllSectionsQuery(undefined);
  const { data: typesRes } = useGetAllTypesQuery(undefined);
  const { data: categoriesRes } = useGetAllCategoriesQuery(undefined);

  const { data: signatureRes, refetch: refetchSignature } =
    useGetSignatureQuery(undefined, {
      skip: !open,
    });

  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const brandOptions: OptionItem[] =
    brandsRes?.data?.map((item: { name: string }) => ({
      value: item.name,
      label: item.name,
    })) ?? [];

  const sectionOptions: OptionItem[] =
    sectionsRes?.data?.map((item: { name: string }) => ({
      value: item.name,
      label: item.name,
    })) ?? [];

  const typeOptions: OptionItem[] =
    typesRes?.data?.map((item: { name: string }) => ({
      value: item.name,
      label: item.name,
    })) ?? [];

  const categoryOptions: OptionItem[] =
    categoriesRes?.data?.map((item: { name: string }) => ({
      value: item.name,
      label: item.name,
    })) ?? [];

  const handleOpenChange = (next: boolean) => {
    if (isUploadingImage) return;
    setOpen?.(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        className="max-h-[92vh] overflow-y-auto rounded-2xl p-0 sm:max-w-xl"
        onPointerDownOutside={(e) => {
          if (isUploadingImage) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (isUploadingImage) e.preventDefault();
        }}
      >
        {/* Header */}
        <DialogHeader className="rounded-t-2xl bg-linear-to-r from-sky-600 via-sky-500 to-orange-400 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-white">
                {isEdit ? "Edit Product" : "Add New Product"}
              </DialogTitle>
              <DialogDescription className="text-sm text-sky-50/90">
                {isEdit
                  ? "Update the details for this product."
                  : "Fill in the details to list a new product."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Only mounted while open — remounting on each open replaces the
            need for an effect that resets form/file/preview state. */}
        {open && (
          <ProductFormContent
            key={isEdit ? `edit-${productId ?? "unknown"}` : "create"}
            isEdit={isEdit}
            productId={productId}
            defaultValues={defaultValues}
            brandOptions={brandOptions}
            sectionOptions={sectionOptions}
            typeOptions={typeOptions}
            categoryOptions={categoryOptions}
            signatureRes={signatureRes}
            refetchSignature={refetchSignature}
            addProduct={addProduct}
            updateProduct={updateProduct}
            isAdding={isAdding}
            isUpdating={isUpdating}
            isUploadingImage={isUploadingImage}
            setIsUploadingImage={setIsUploadingImage}
            onClose={() => setOpen?.(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}