/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import { FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useAddQuotaMutation } from "@/redux/features/quota/quota.auth";

const formSchema = z.object({
  volume: z.string().min(1, "Volume is required"),
  requirements: z.string().min(5, "Please provide your requirements"),
  address: z.string().min(5, "Address is required"),
  cylinderOrRefill: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  product: any;
}

export default function RequestQuotaDialog({ product }: Props) {
  const [open, setOpen] = useState(false);

  const [createQuota, { isLoading }] = useAddQuotaMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      volume: "",
      requirements: "",
      address: "",
      cylinderOrRefill: false,
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const payload = {
        productId: product._id,
        volume: values.volume,
        requirements: values.requirements,
        address: values.address,
        cylinderOrRefill: values.cylinderOrRefill,
      };

      const res = await createQuota(payload).unwrap();

      toast.success(res.message);

      form.reset();

      setOpen(false);
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1 rounded-xl bg-sky-600 hover:bg-sky-700">
          Request Quote
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Request Quotation</DialogTitle>

          <DialogDescription>
            Complete the form below and our sales team will contact you shortly.
          </DialogDescription>
        </DialogHeader>

        {/* Product Summary */}

        <div className="rounded-xl border bg-sky-50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">{product.name}</h3>

              <p className="text-sm text-slate-500">{product.brand?.name}</p>
            </div>

            <Badge>{product.type?.name}</Badge>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Volume */}

            <FormField
              control={form.control}
              name="volume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Volume</FormLabel>

                  <FormControl>
                    <Input placeholder="Example: 50L" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cylinder */}

            <FormField
              control={form.control}
              name="cylinderOrRefill"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you want Cylinder/Refill?</FormLabel>

                  <FormControl>
                    <RadioGroup
                      value={field.value ? "yes" : "no"}
                      onValueChange={(value) => field.onChange(value === "yes")}
                      className="grid grid-cols-2 gap-4 pt-2"
                    >
                      <label
                        htmlFor="yes"
                        className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all hover:border-sky-500 hover:bg-sky-50"
                      >
                        <RadioGroupItem value="yes" id="yes" />

                        <span className="font-medium">Yes</span>
                      </label>

                      <label
                        htmlFor="no"
                        className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all hover:border-sky-500 hover:bg-sky-50"
                      >
                        <RadioGroupItem value="no" id="no" />

                        <span className="font-medium">No</span>
                      </label>
                    </RadioGroup>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Requirements */}

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>

                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Tell us about your requirements..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Address</FormLabel>

                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Enter delivery address..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Submit Quotation Request
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
