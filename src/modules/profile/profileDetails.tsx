"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";

/* ================= VALIDATION ================= */
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

/* ================= COMPONENT ================= */
export default function ProfileDetailsPage({ user }: { user: any }) {
  const [open, setOpen] = useState(false);

  /* ================= FORM ================= */
  const form = useForm({
    defaultValues: {
      name: "",
      image: "",
    },
    validators: {
      onSubmit: profileSchema,
    },
    onSubmit: async ({ value }) => {
      const updatedData: { name?: string; image?: string } = {};
      if (value.name) updatedData.name = value.name;
      if (value.image) updatedData.image = value.image;

      console.log("UPDATED DATA:", updatedData);
      setOpen(false);
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* ================= PROFILE CARD ================= */}
      <Card className="p-6 flex items-center gap-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.image || ""} />
          <AvatarFallback>
            {user.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>

          <div className="flex gap-2 mt-2">
            <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-600">
              {user.status}
            </span>
            <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-600">
              {user.role}
            </span>
          </div>
        </div>

        <Button onClick={() => setOpen(true)}>Edit Profile</Button>
      </Card>

      {/* ================= EXTRA INFO ================= */}
      <Card className="p-6 space-y-2">
        <h3 className="font-semibold">Account Info</h3>

        <p className="text-sm text-muted-foreground">
          Joined: {new Date(user.createdAt).toLocaleDateString()}
        </p>

        <p className="text-sm text-muted-foreground">
          Email Verified: {user.emailVerified ? "Yes" : "No"}
        </p>
      </Card>

      {/* ================= EDIT MODAL ================= */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            {/* NAME */}
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <p className="text-xs text-red-500 mt-1">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                );
              }}
            />

            {/* IMAGE URL */}
            <form.Field
              name="image"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <div>
                    <label className="text-sm font-medium">Image URL</label>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <p className="text-xs text-red-500 mt-1">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                );
              }}
            />

            {/* SUBMIT */}
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
