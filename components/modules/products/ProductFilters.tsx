"use client";

import { Search, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  _id: string;
  name: string;
}

interface ProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;

  brand: string;
  onBrandChange: (value: string) => void;

  section: string;
  onSectionChange: (value: string) => void;

  type: string;
  onTypeChange: (value: string) => void;

  category: string;
  onCategoryChange: (value: string) => void;

  brands?: Option[];
  sections?: Option[];
  types?: Option[];
  categories?: Option[];

  onReset: () => void;
}

export default function ProductFilters({
  search,
  onSearchChange,

  brand,
  onBrandChange,

  section,
  onSectionChange,

  type,
  onTypeChange,

  category,
  onCategoryChange,

  brands = [],
  sections = [],
  types = [],
  categories = [],

  onReset,
}: ProductFiltersProps) {
  return (
    <div className="mb-12 rounded-3xl border bg-white p-6 shadow-sm">
      <div className="grid gap-5 lg:grid-cols-5">
        {/* Search */}

        <div className="relative lg:col-span-2">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="pl-10"
          />
        </div>

        {/* Brand */}

        <Select value={brand} onValueChange={onBrandChange}>
          <SelectTrigger>
            <SelectValue placeholder="Brand" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>

            {brands.map((item) => (
              <SelectItem
                key={item._id}
                value={item._id}
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Section */}

        <Select value={section} onValueChange={onSectionChange}>
          <SelectTrigger>
            <SelectValue placeholder="Section" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Sections</SelectItem>

            {sections.map((item) => (
              <SelectItem
                key={item._id}
                value={item._id}
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type */}

        <Select value={type} onValueChange={onTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>

            {types.map((item) => (
              <SelectItem
                key={item._id}
                value={item._id}
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-[1fr_auto]">
        {/* Category */}

        <Select
          value={category}
          onValueChange={onCategoryChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All Categories
            </SelectItem>

            {categories.map((item) => (
              <SelectItem
                key={item._id}
                value={item._id}
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Reset */}

        <Button
          variant="outline"
          onClick={onReset}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />

          Reset Filters
        </Button>
      </div>
    </div>
  );
}