"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutInnerForm from "./checkoutInnerform";
import env from "@/env";

const stripePromise = loadStripe(env.NEXT_PUBLIC_PAYMENT_PUBLISHER_KEY);

export default function CheckoutWrapper(props: any) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutInnerForm {...props} />
    </Elements>
  );
}