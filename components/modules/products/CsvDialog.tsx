/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAddManyProductsMutation } from "@/redux/features/products/products.auth";
import { FileSpreadsheet, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function ImportProductsCSVDialog({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [addManyProducts, { isLoading }] = useAddManyProductsMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    if (!selected.name.toLowerCase().endsWith(".csv")) {
      toast.error("Please select a .csv file.");
      return;
    }

    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please choose a CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await addManyProducts(formData).unwrap();
      toast.success(res?.message ?? "Products imported successfully!");
      setFile(null);
      setOpen(false);
    } catch (error: any) {
      toast.error(
        error?.data?.message ?? "An error occurred while importing products.",
      );
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setFile(null);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Import Products from CSV</DialogTitle>
          <DialogDescription>
            Columns expected: name, brand, section, type, categories.
            Separate multiple categories with a |, e.g. Shoes|Running|Men.
          </DialogDescription>
        </DialogHeader>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sky-200 bg-sky-50/50 px-4 py-8 text-center transition-colors hover:border-sky-300 hover:bg-sky-50"
        >
          {file ? (
            <>
              <FileSpreadsheet className="h-7 w-7 text-orange-500" />
              <span className="text-sm font-medium text-slate-700">
                {file.name}
              </span>
              <span className="text-xs text-slate-400">
                Click to choose a different file
              </span>
            </>
          ) : (
            <>
              <UploadCloud className="h-7 w-7 text-sky-400" />
              <span className="text-sm font-medium text-slate-600">
                Click to choose a CSV file
              </span>
              <span className="text-xs text-slate-400">Max 5MB</span>
            </>
          )}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={handleFileChange}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleUpload}
            disabled={isLoading || !file}
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            {isLoading ? "Importing..." : "Import Products"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}