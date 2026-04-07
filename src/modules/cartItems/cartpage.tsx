"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import { createOrder } from "@/actions/menu.action";
import { useRouter } from "next/navigation";
import { removeCartItem } from "@/actions/cart.action";

const checkoutSchema = z.object({
  address: z.string().min(1, "Address is required"),
});

export default function SubCartPage({ cartItems }: { cartItems: any[] }) {
  const router = useRouter();

  const [items, setItems] = useState(cartItems);
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      address: "",
    },
    validators: {
      onSubmit: checkoutSchema,
    },
    onSubmit: async ({ value }) => {
      const payload = {
        items: items.map((item) => ({
          meal_id: item.meal_id,
          provider_id: item.provider_id,
          quantity: item.quantity,
        })),
        delivery_address: value.address,
      };

      const toastId = toast.loading("Placing your order...");
      try {
        const response = await createOrder(payload);

        if (response) {
          toast.success("Order placed successfully!", {
            id: toastId,
          });
          setItems([]);
          setOpen(false);
          router.push("/orders");
          return;
        }

        toast.error("Failed to place the order. Please try again.", {
          id: toastId,
        });
      } catch (error) {
        toast.error("Failed to place the order. Please try again.", {
          id: toastId,
        });
      }
    },
  });

  //

  // ✅ quantity update
  const updateQuantity = (id: string, type: "inc" | "dec") => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;

          return {
            ...item,
            quantity: newQty < 1 ? 1 : newQty,
          };
        }
        return item;
      }),
    );
  };

  // ✅ remove item
  const removeItem = async (id: string) => {
    const { data, error } = await removeCartItem(id);

    const toastId = toast.loading("Removing item from cart...");
    if (data) {
      toast.success("Item removed from cart!", {
        id: toastId,
      });
      setItems((prev) => prev.filter((item) => item.id !== id));
      return
    }

    toast.error(
      error?.message || "Failed to remove the item. Please try again.",
      {
        id: toastId,
      },
    );
  };

  // ✅ total
  const total = items.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0,
  );

  return (
    <div>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
          {/* IMAGE / ILLUSTRATION */}
          <div className="relative w-40 h-40">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="object-contain w-full h-full opacity-80"
            />
          </div>

          {/* TEXT */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground text-sm">
              Looks like you haven’t added anything yet.
            </p>
          </div>

          {/* CTA BUTTON */}
          <div>
            <Button asChild>
              <a href="/meals">Browse Meals</a>
            </Button>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          {/* 🔥 HEADER */}
          <div className="flex justify-between text-sm text-muted-foreground">
            <p>You have {items.length} products in your cart</p>
          </div>

          <Separator />

          {/* 🔥 TABLE HEADER */}
          <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground px-2">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          <Separator />

          {/* 🔥 ITEMS */}
          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 items-center gap-4 py-4 border-b"
            >
              {/* PRODUCT */}
              <div className="col-span-6 flex gap-4 items-center">
                <div className="relative w-16 h-16 rounded-md overflow-hidden">
                  <Image
                    src={
                      item.image_url ||
                      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                    }
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    Provider: {item.provider_id.slice(0, 6)}...
                  </p>

                  {/* 🔥 REMOVE BUTTON */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-500 hover:underline mt-1 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* PRICE */}
              <div className="col-span-2 text-center">
                ${Number(item.price).toFixed(2)}
              </div>

              {/* QUANTITY */}
              <div className="col-span-2 flex justify-center">
                <div className="flex items-center border rounded-full px-2 py-1 gap-2">
                  <button
                    className="cursor-pointer"
                    onClick={() => updateQuantity(item.id, "dec")}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="cursor-pointer"
                    onClick={() => updateQuantity(item.id, "inc")}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* TOTAL */}
              <div className="col-span-2 text-right font-medium">
                ${(Number(item.price) * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          {/* 🔥 SUMMARY */}
          <div className="flex justify-end">
            <div className="text-right space-y-1">
              <p className="text-lg font-semibold">
                Sub Total: ${total.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">
                Excl. Tax and Delivery charge
              </p>
            </div>
          </div>

          {/* 🔥 ACTION BUTTONS */}
          <div className="flex justify-end gap-4">
            <Button variant="outline">Continue Shopping</Button>
            <Button onClick={() => setOpen(true)}>Go To Checkout</Button>
          </div>

          {/* 🔥 MODAL */}
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
                  <form.Field
                    name="address"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel>Addredd</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            type="text"
                            placeholder="Enter your delivery address"
                          ></Input>
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  ></form.Field>
                  <Button type="submit" className="w-full mt-3">
                    Place Order
                  </Button>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
