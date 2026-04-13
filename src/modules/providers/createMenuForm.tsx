"use client";

import { createMenu, getCategories } from "@/actions/provider.action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const CreateMenuFormSchema = z.object({
  category_id: z.string().min(1, "Category is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z
    .number()
    .min(0, "Price must be a number")
    .positive("Price must be positive"),
  image_url: z.url("Invalid URL"),
  is_vegetarian: z.boolean(),
  is_vegan: z.boolean(),
  is_halal: z.boolean(),
  is_gluten_free: z.boolean(),
  is_feature: z.boolean(),
});

const CreateMenuForm = () => {
  const [categories, setCategories] = useState<any | null>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkBoxItems = [
    { name: "is_vegetarian", label: "Vegetarian" },
    { name: "is_vegan", label: "Vegan" },
    { name: "is_halal", label: "Halal" },
    { name: "is_gluten_free", label: "Gluten Free" },
    { name: "is_feature", label: "Feature" },
  ];

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await getCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const form = useForm({
    defaultValues: {
      category_id: "",
      name: "",
      description: "",
      price: 0,
      image_url: "",
      is_vegetarian: false,
      is_vegan: false,
      is_halal: false,
      is_gluten_free: false,
      is_feature: false,
    },
    validators: {
      onSubmit: CreateMenuFormSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating menu...");
      try {
        setIsSubmitting(true);

        const { data } = await createMenu(value);

        if (data) {
          setIsSubmitting(false);
          toast.success("Menu created successfully", { id: toastId });
          form.reset();
          return;
        }

        toast.error("Failed to create menu", { id: toastId });
      } catch (error) {
        toast.error("Failed to create menu", { id: toastId });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-3xl mx-auto border p-6 rounded-md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(e);
        }}
      >
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Create Meal</h1>
          <p className="text-sm text-muted-foreground">
            Add a new meal for your menu
          </p>
        </div>

        <FieldGroup>
          <form.Field
            name="category_id"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                // Category
                <Field>
                  <FieldLabel>Category</FieldLabel>

                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category"></SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((category: any) => (
                        <SelectItem value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          ></form.Field>

          <form.Field
            name="name"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    placeholder="Write the food name here..."
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          ></form.Field>

          <form.Field
            name="description"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Textarea
                    className="resize-none h-[200px]"
                    placeholder="Write your description here..."
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          ></form.Field>

          <form.Field
            name="price"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                  <Input
                    type="number"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.handleChange(value === "" ? 0 : Number(value));
                    }}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          ></form.Field>

          <form.Field
            name="image_url"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          ></form.Field>

          <div>
            {checkBoxItems.map((item: any) => (
              <form.Field
                name={item.name}
                children={(field) => {
                  return (
                    <div className="flex gap-3 mb-5">
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        checked={field.state.value}
                        onCheckedChange={(value) =>
                          field.handleChange(Boolean(value))
                        }
                      ></Checkbox>

                      <FieldLabel>{item.label}</FieldLabel>
                    </div>
                  );
                }}
              ></form.Field>
            ))}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            Create Menu
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};

export default CreateMenuForm;
