"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Meal } from "@/types/meal.type";

export function MealCard({ meal }: { meal: Meal }) {
  return (
    <Card key={meal.id} className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition">
      
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          fill
          src={
            meal.image_url ||
            "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
          }
          alt={meal.name}
          className="object-cover"
        />
      </div>

      {/* Content */}
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{meal.name}</h3>
          <span className="text-primary font-bold text-lg">
            ${meal.price}
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {meal.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {meal.is_vegetarian && <Badge variant="secondary">Vegetarian</Badge>}
          {meal.is_vegan && <Badge variant="secondary">Vegan</Badge>}
          {meal.is_halal && <Badge variant="secondary">Halal</Badge>}
          {meal.is_gluten_free && (
            <Badge variant="secondary">Gluten Free</Badge>
          )}
          {meal.is_feature && <Badge>Featured</Badge>}
        </div>

        {/* Availability */}
        <div>
          {meal.is_available ? (
            <span className="text-green-600 text-sm font-medium">
              Available
            </span>
          ) : (
            <span className="text-red-500 text-sm font-medium">
              Out of stock
            </span>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 flex justify-between items-center">
        <Button asChild className="w-full">
          <Link href={`/meals/${meal.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}