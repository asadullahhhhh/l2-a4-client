"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { createCategory } from "@/actions/admin.action";
import { toast } from "sonner";

// Zod Schema
const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

export default function CreateCategoryAdminPage() {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
      const payload = {
        name: value.name,
        description: value.description,
      };

      const toastId = toast.loading("Creating category...");
      const { data, error } = await createCategory(payload);

      if (data) {
        toast.success("Category created successfully!", { id: toastId });
        form.reset();
        return;
      }

      toast.error(error?.message || "Failed to create category.", {
        id: toastId,
      });
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* 🔥 HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Category</h1>
        <p className="text-sm text-muted-foreground">
          Add a new food category for your platform
        </p>
      </div>

      {/* 🔥 CARD */}
      <Card className="p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {/* NAME */}
          <form.Field
            name="name"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter category name"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {/* DESCRIPTION */}
          <form.Field
            name="description"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    className="resize-none h-[300px]"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Write short description..."
                    rows={4}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {/* 🔥 BUTTON */}
          <Button
            type="submit"
            disabled={form.state.isSubmitting}
            className="w-full"
          >
            Create Category
          </Button>
        </form>
      </Card>
    </div>
  );
}
