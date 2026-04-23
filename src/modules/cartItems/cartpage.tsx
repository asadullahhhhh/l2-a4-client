"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { removeCartItem } from "@/actions/cart.action";
import { loadStripe } from "@stripe/stripe-js";
import env from "@/env";
import { Elements } from "@stripe/react-stripe-js";
import CartCheckoutWarper from "./checkoutWarper";



const stripePromise = loadStripe(env.NEXT_PUBLIC_PAYMENT_PUBLISHER_KEY);


export default function SubCartPage({ cartItems, session }: { cartItems: any[]; session: any }) {

  const [items, setItems] = useState(cartItems);
  const [open, setOpen] = useState(false);

 

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
      return;
    }

    toast.error(
      error?.message || "Failed to remove the item. Please try again.",
      {
        id: toastId,
      },
    );
  };

  // ✅ total
  const totalPrice = items.reduce(
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
                Sub Total: ${totalPrice.toFixed(2)}
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

              <Elements stripe={stripePromise}>
                <CartCheckoutWarper setItems={setItems} setOpen={setOpen} items={items} totalPrice={totalPrice} session={session} />
              </Elements>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
