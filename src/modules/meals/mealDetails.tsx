"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { redirect } from "next/navigation";
import { CheckoutButton } from "./checkoutButton";
import { toast } from "sonner";
import { createBookMark } from "@/actions/menu.action";
import PostReviewForm from "./review";

const MealDetails = ({
  meal,
  session,
  isBookMark,
  exist,
}: {
  meal: any;
  session: any;
  isBookMark: boolean;
  exist: boolean;
}) => {
  const handelBookMark = async () => {
    if (!session) {
      redirect("/login");
    }
    const toastId = toast.loading("Adding meal to cart...");

    if (isBookMark) {
      toast.info("Meal is already in the cart.", {
        id: toastId,
      });
      return;
    } else {
      const data = await createBookMark(
        meal.id,
        meal.price,
        meal.provider_id,
        meal.image_url,
        meal.name,
      );
      if (data?.data?.success) {
        toast.success("Meal added to cart successfully.", {
          id: toastId,
        });
      }
    }
  };



  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* ================= PROVIDER ================= */}
      <Card className="p-6 flex items-center gap-4">
        <Avatar className="h-30 w-30">
          <AvatarImage src={meal.provider.logo_url} />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h2 className="text-lg font-semibold">
            {meal.provider.resturent_name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {meal.provider.address}
          </p>
          <p className="text-xs text-muted-foreground">{meal.provider.phone}</p>
        </div>
      </Card>

      {/* ================= MEAL HERO ================= */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* IMAGE */}
        <div className="relative h-[320px] w-full rounded-xl overflow-hidden">
          <Image
            src={
              meal.image_url ||
              "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
            }
            alt={meal.name}
            fill
            className="object-cover"
          />
        </div>

        {/* INFO */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{meal.name}</h1>

          <p className="text-muted-foreground">{meal.description}</p>

          <div className="text-2xl font-bold text-primary">${meal.price}</div>

          {/* BADGES */}
          <div className="flex flex-wrap gap-2">
            {meal.is_vegetarian && <Badge>Vegetarian</Badge>}
            {meal.is_vegan && <Badge>Vegan</Badge>}
            {meal.is_halal && <Badge>Halal</Badge>}
            {meal.is_gluten_free && <Badge>Gluten Free</Badge>}
            {meal.is_feature && <Badge variant="secondary">Featured</Badge>}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col gap-3 pt-4">
            <CheckoutButton mealId={meal.id} session={session} providerId={meal.provider.id} />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handelBookMark()}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* ================= DETAILS ================= */}
      <Card className="p-6 space-y-3">
        <h2 className="text-xl font-semibold">Meal Details</h2>
        <p className="text-muted-foreground">{meal.description}</p>
      </Card>

      {/* ================= POST REVIEW ================= */}
      { exist && <PostReviewForm mealId={meal.id} />}

      {/* ================= REVIEWS ================= */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Reviews</h2>

        {meal.reviews?.length ? (
          meal.reviews.map((review: any) => (
            <Card key={review.id} className="p-4 space-y-2">
              <div className="flex justify-between">
                <p className="font-medium">User</p>
                <span className="text-sm text-yellow-500">
                  ⭐ {review.rating}/5
                </span>
              </div>

              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default MealDetails;
