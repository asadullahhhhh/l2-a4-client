"use client";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useTheme } from "next-themes";

const orderSchema = z.object({
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  address: z.string().min(1, "Address is required"),
});

export default function CheckoutInnerForm({
  mealId,
  providerId,
}: {
  mealId: string;
  providerId: string;
}) {
  // ==> Stripe Hooks and state <===
  const stripe = useStripe();
  const elements = useElements();
  const theme = useTheme();
  const isDark = theme.theme === "dark"

  //   ==> Form Submission Handler <==
  const form = useForm({
    defaultValues: {
      quantity: 1,
      address: "",
    },
    validators: {
      onSubmit: orderSchema,
    },
    onSubmit: async ({ value }) => {
      if (!stripe || !elements) return;

      const card = elements.getElement(CardElement);
      console.log(card);

      console.log(value);
    },
  });

  //   ===> Card Element options <===
  const CARD_OPTIONS = {
    style: {
      base: {
        fontSize: "16px",
        color: isDark ? "#f8fafc" : "#111827",
        fontFamily: "Inter, system-ui, sans-serif",

        "::placeholder": {
          color: isDark ? "#6b7280" : "#9ca3af",
        },

        iconColor: isDark ? "#818cf8" : "#6366f1",
      },

      invalid: {
        color: "#ef4444",
        iconColor: "#ef4444",
      },

      complete: {
        color: isDark ? "#f9fafb" : "#111827",
        iconColor: "#22c55e",
      },
    },
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel>Payment Method</FieldLabel>
          <div
            className="
                w-full rounded-2xl border px-4 py-3 shadow-sm transition-all duration-200
                bg-white border-gray-300 text-gray-900
                hover:border-gray-400
                focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20

                dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100
                dark:hover:border-gray-600
                dark:focus-within:border-indigo-400 dark:focus-within:ring-indigo-400/20
            "
          >
            <CardElement options={CARD_OPTIONS} />
          </div>
        </Field>

        <form.Field
          name="quantity"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel>Quantity</FieldLabel>
                <Input
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Field
          name="address"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel>Address</FieldLabel>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <Button type="submit" className="w-full">
          Confirm Order
        </Button>
      </FieldGroup>
    </form>
  );
}
