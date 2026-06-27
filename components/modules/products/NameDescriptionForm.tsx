"use client";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters."),

  description: z
    .string()
    .trim()
    .min(5, "Description must be at least 5 characters."),
});

export type NameDescriptionFormValues = z.infer<typeof formSchema>;

interface NameDescriptionDialogProps {
  entityName: string;

  trigger: React.ReactNode;

  isEdit?: boolean;

  loading?: boolean;

  defaultValues?: Partial<NameDescriptionFormValues>;

  onSubmit: (
    values: NameDescriptionFormValues
  ) => Promise<void> | void;
}

export default function NameDescriptionDialog({
  entityName,
  trigger,
  isEdit = false,
  loading = false,
  defaultValues,
  onSubmit,
}: NameDescriptionDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<NameDescriptionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: defaultValues?.name ?? "",
        description: defaultValues?.description ?? "",
      });
    }
  }, [open, defaultValues, form]);

  const handleSubmit = async (values: NameDescriptionFormValues) => {
    await onSubmit(values);

    form.reset();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (!value) {
          form.reset({
            name: defaultValues?.name ?? "",
            description: defaultValues?.description ?? "",
          });
        }
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? `Edit ${entityName}` : `Add ${entityName}`}
          </DialogTitle>

          <DialogDescription>
            {isEdit
              ? `Update the ${entityName.toLowerCase()} information.`
              : `Create a new ${entityName.toLowerCase()}.`}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input
                      placeholder={`Enter ${entityName.toLowerCase()} name`}
                      {...field}
                    />
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
                    <Textarea
                      className="min-h-45"
                      rows={5}
                      placeholder="Write a short description..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Please wait..."
                  : isEdit
                    ? `Update ${entityName}`
                    : `Create ${entityName}`}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}