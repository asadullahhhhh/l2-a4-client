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
import { useState } from "react";
import { paymentIntent } from "@/actions/payment.action";
import { toast } from "sonner";
import { createOrder } from "@/actions/menu.action";
import { useRouter } from "next/navigation";

const orderSchema = z.object({
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  address: z.string().min(1, "Address is required"),
});

export default function CheckoutInnerForm({
  mealId,
  providerId,
  mealPrice,
  session,
}: {
  mealId: string;
  providerId: string;
  mealPrice: number;
  session: any;
}) {
  // ==> Stripe Hooks and state <===
  const stripe = useStripe();
  const elements = useElements();
  const theme = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const isDark = theme.theme === "dark";

  //   ==> Form Submission Handler <==
  const form = useForm({
    defaultValues: {
      quantity: 1,
      address: "",
    },
    validators: {
      onSubmit: orderSchema as any,
    },
    onSubmit: async ({ value }) => {
      const item = {
        items: [
          {
            meal_id: mealId,
            provider_id: providerId,
            quantity: value.quantity,
          },
        ],
        delivery_address: value.address,
      };

      const toastId = toast.loading("Processing your order...");
      setLoading(true);

      // ===> Card functions <===
      if (!stripe || !elements) {
        toast.error("Stripe has not loaded yet. Please try again.", {
          id: toastId,
        });
        setLoading(false);
        return;
      }

      const card = elements.getElement(CardElement);

      if (!card) {
        toast.error("Card information is not available. Please try again.", {
          id: toastId,
        });
        setLoading(false);
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        setError(error.message || "An unexpected error occurred.");
        return;
      }
      setError(null);

      const amount = mealPrice * value.quantity * 100;

      //   ===> Create Payment Intent and get client secret <===
      const { data, error: paymentError } = await paymentIntent(amount);
      const clientSecret = data?.clientSecret;

      if (paymentError || !clientSecret) {
        toast.error(
          paymentError?.message ||
            "Failed to create payment intent. Please try again.",
          {
            id: toastId,
          },
        );
        setLoading(false);
        return;
      }

      //   ==> Handle Payment Confirmation <===
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            email: session?.user?.email || "guest@example.com",
            name: session?.user?.name || "Guest User",
          },
        },
      });

      if (result.error) {
        toast.error(
          result.error.message || "Payment failed. Please try again.",
          {
            id: toastId,
          },
        );
        setLoading(false);
      } else {
        if (result.paymentIntent?.status === "succeeded") {
          // Payment successful, you can now create the order in your backend
          const payload = {
            paymentData: {
              paymentId: result.paymentIntent?.id,
              amount: result.paymentIntent?.amount,
              currency: result.paymentIntent?.currency,
            },
            item,
          };

          const { data, error } = await createOrder(payload);

          if (error) {
            toast.error(
              error?.message ||
                "Failed to create order. Please contact support.",
              {
                id: toastId,
              },
            );
            setLoading(false);
            return;
          }

          toast.success("Your order has been placed successfully!", {
            id: toastId,
          });
          setLoading(false);
          router.push("/orders");
        }
      }
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
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
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

        <Button
          disabled={loading || !stripe}
          type="submit"
          className="w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Processing..." : "Confirm Order"}
        </Button>
      </FieldGroup>
    </form>
  );
}
