"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { menuService } from "@/service/menu.service";
import { createOrder } from "@/actions/menu.action";
import { toast } from "sonner";

const orderSchema = z.object({
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  address: z.string().min(1, "Address is required"),
});

export function CheckoutButton({
  mealId,
  providerId,
}: {
  mealId: string;
  providerId: string;
}) {
  const form = useForm({
    defaultValues: {
      quantity: 1,
      address: "",
    },
    validators: {
      onSubmit: orderSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Confirming your order...");
      try {
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
        const response = await createOrder(item);

        if (response.data.success) {
          toast.success("Order confirmed successfully!", { id: toastId });
          setOpen(false);
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to create order.", {
          id: toastId,
        });
        setOpen(false);
      }
    },
  });

  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full">
        Order Now
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                  <h1 className="text-2xl font-bold">Create your account</h1>
                  <p className="text-sm text-balance text-muted-foreground">
                    Fill in the form below to create your account
                  </p>
                </div>

                {/* Form start */}

                {/* Name field */}
                <form.Field
                  name="quantity"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Quantity</FieldLabel>
                        <Input
                          type="number"
                          min={1}
                          step={1}
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            field.handleChange(value < 1 ? 1 : value);
                          }}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                ></form.Field>

                {/* Address field */}
                <form.Field
                  name="address"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                ></form.Field>

                <Button type="submit">Sign Up</Button>
              </FieldGroup>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
