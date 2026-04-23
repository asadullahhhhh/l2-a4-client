"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutInnerForm from "./checkoutInnerform";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

export default function CheckoutWrapper(props: any) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutInnerForm {...props} />
    </Elements>
  );
}