"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createReview } from "@/actions/menu.action";
import { useRouter } from "next/navigation";

// ================= ZOD SCHEMA =================
const ReviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating is required")
    .max(5, "Max rating is 5"),
  comment: z
    .string()
    .min(5, "Comment must be at least 5 characters"),
});

// ================= COMPONENT =================
export default function PostReviewForm({ mealId }: { mealId: string }) {
  const [hover, setHover] = useState(0);

  const router = useRouter()

  const form = useForm({
    defaultValues: {
      rating: 0,
      comment: "",
    },
    validators: {
      onSubmit: ReviewSchema,
    },
    onSubmit: async ({ value }) => {
      const payload = {
        meal_id: mealId,
        rating: value.rating,
        comment: value.comment,
      };
      const taostId = toast.loading("Submitting your review...");
      try {
        const {data, error} = await createReview(
          payload.meal_id,
          payload.rating,
          payload.comment,
        );

        if(data) {
            toast.success("Review submitted successfully!", {
              id: taostId,
            });
            form.reset();
            router.refresh();
            return
        }

        toast.error(error?.message || "Failed to submit review. Please try again.", {
          id: taostId,
        });

      } catch (error) {
        toast.error("Failed to submit review. Please try again.", {
          id: taostId,
        });
      }
    },
  });

  return (
    <div className="max-w-xl mx-auto border p-6 rounded-md">
      <h2 className="text-xl font-bold mb-4">Post Review</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {/* STAR RATING */}
          <form.Field
            name="rating"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field>
                  <FieldLabel>Rating</FieldLabel>

                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`cursor-pointer transition ${
                          (hover || field.state.value) >= star
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => field.handleChange(star)}
                      />
                    ))}
                  </div>

                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          />

          {/* COMMENT */}
          <form.Field
            name="comment"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field>
                  <FieldLabel>Comment</FieldLabel>
                  <Textarea
                    placeholder="Write your review..."
                    className="resize-none h-[150px]"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          />

          {/* SUBMIT */}
          <Button type="submit" className="w-full">
            Submit Review
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
