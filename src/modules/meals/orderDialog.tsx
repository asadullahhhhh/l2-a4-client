"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CheckoutWrapper from "./checkoutWarper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const OrderDialog = ({ open, setOpen, mealId, providerId, session }: any) => {
  const router = useRouter();
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
          if (!session) {
            router.push("/login");
          }
        }}
        className="w-full"
      >
        Order Now
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <CheckoutWrapper
              mealId={mealId}
              providerId={providerId}
              session={session}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderDialog;
