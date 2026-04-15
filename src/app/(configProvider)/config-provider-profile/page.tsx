"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createProviderProfile } from "@/actions/provider.action";
import { useRouter } from "next/navigation";

export default function ConfigureProviderPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      resturent_name: "",
      description: "",
      address: "",
      phone: "",
      logo_url: "",
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      const toastId = toast.loading("Configuring your restaurant...");

      try {
        const {data, error} = await createProviderProfile(value)

        if(data) {
            toast.success("Restaurant configured successfully!", { id: toastId });
            router.push("/provider-dashboard/create-menu")
            return;
        }

        toast.error(error?.message || "Failed to configure your restaurant.", { id: toastId });

      } catch (error) {
        toast.error("Failed to configure your restaurant.", { id: toastId });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-950 dark:to-gray-900 px-4">

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="w-full max-w-lg space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
            Configure Your Restaurant
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Set up your restaurant profile to get started
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">

          {/* Name */}
          <form.Field
            name="resturent_name"
            validators={{
              onChange: ({ value }) =>
                !value ? "Restaurant name is required" : undefined,
            }}
          >
            {(field) => (
              <div>
                <Input
                  placeholder="Restaurant Name"
                  className="h-11 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors && (
                  <p className="text-red-500 text-xs mt-1">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Description */}
          <form.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                value.length < 10
                  ? "Minimum 10 characters required"
                  : undefined,
            }}
          >
            {(field) => (
              <div>
                <Textarea
                  placeholder="Description"
                  className="h-30 rounded-xl resize-none"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors && (
                  <p className="text-red-500 text-xs mt-1">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Address */}
          <form.Field
            name="address"
            validators={{
              onChange: ({ value }) =>
                !value ? "Address is required" : undefined,
            }}
          >
            {(field) => (
              <div>
                <Input
                  placeholder="Address"
                  className="h-11 rounded-xl"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors && (
                  <p className="text-red-500 text-xs mt-1">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Phone */}
          <form.Field
            name="phone"
            validators={{
              onChange: ({ value }) =>
                !/^\+880\d{10}$/.test(value)
                  ? "Use format: +880XXXXXXXXXX"
                  : undefined,
            }}
          >
            {(field) => (
              <div>
                <Input
                  placeholder="Phone (+880...)"
                  className="h-11 rounded-xl"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors && (
                  <p className="text-red-500 text-xs mt-1">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Logo */}
          <form.Field
            name="logo_url"
            validators={{
              onChange: ({ value }) =>
                !value.startsWith("http")
                  ? "Enter valid URL"
                  : undefined,
            }}
          >
            {(field) => (
              <div>
                <Input
                  placeholder="Logo URL"
                  className="h-11 rounded-xl"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors && (
                  <p className="text-red-500 text-xs mt-1">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>
        </div>

        {/* Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-xl text-base text-white font-medium bg-blue-600 hover:bg-blue-700 transition-all"
        >
          {isSubmitting ? "Configuring..." : "Configure"}
        </Button>
      </form>
    </div>
  );
}