"use client";

import { LoginForm } from "@/modules/authentication/login-form";
import { SignupForm } from "@/modules/authentication/signup-form";
import { GalleryVerticalEndIcon } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const logo = {
    url: "/",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQogFBY7OH5mYcuXxitxOJJaztWMCTzzTYhYQ&s",
    alt: "logo",
    title: "Foodhub",
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href={logo.url} className="flex items-center gap-2">
            <img src={logo.src} className="max-h-8" alt={logo.alt} />
            <span className="text-lg font-semibold tracking-tighter">
              {logo.title}
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://img.freepik.com/free-vector/fastfood-restaurant-pictograms-circle-composition-banner_1284-6805.jpg?semt=ais_incoming&w=740&q=80"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5]"
        />
      </div>
    </div>
  );
}
