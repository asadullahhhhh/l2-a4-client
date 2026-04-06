import Image from "next/image";
import { menuService } from "@/service/menu.service";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { providerService } from "@/service/provider.service";
import Link from "next/link";

const ProviderDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { data } = await providerService.getProviderById(id);

  const provider = data?.data;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">

      {/* ================= HERO SECTION ================= */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        
        <Avatar className="h-24 w-24">
          <AvatarImage src={provider.logo_url} />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>

        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl font-bold">
            {provider.resturent_name}
          </h1>

          <p className="text-muted-foreground max-w-xl">
            {provider.description}
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start text-sm text-muted-foreground">
            <span>📍 {provider.address}</span>
            <span>📞 {provider.phone}</span>
          </div>

          <div className="flex gap-2 justify-center md:justify-start">
            <Badge variant="secondary">Verified</Badge>
            <Badge>Fast Delivery</Badge>
          </div>
        </div>
      </div>

      <Separator />

      {/* ================= MEALS SECTION ================= */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Available Meals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {provider.meals.map((meal: any) => (
            <Card
              key={meal.id}
              className="overflow-hidden hover:shadow-lg transition-all flex flex-col"
            >
              {/* IMAGE */}
              <div className="relative h-40 w-full">
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

              {/* CONTENT */}
              <div className="p-4 flex flex-col flex-1 gap-2">
                <h3 className="font-semibold text-lg line-clamp-1">
                  {meal.name}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {meal.description}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-1">
                  {meal.is_vegetarian && <Badge>Veg</Badge>}
                  {meal.is_vegan && <Badge>Vegan</Badge>}
                  {meal.is_halal && <Badge>Halal</Badge>}
                  {meal.is_feature && (
                    <Badge variant="secondary">Featured</Badge>
                  )}
                </div>

                {/* PRICE + STATUS */}
                <div className="flex items-center justify-between mt-auto pt-3">
                  <span className="font-bold text-primary">
                    ${meal.price}
                  </span>

                  {!meal.is_available && (
                    <Badge variant="destructive">Unavailable</Badge>
                  )}
                </div>

                {/* ACTION */}
               <Link href={`/meals/${meal.id}`}>
                   <Button
                  disabled={!meal.is_available}
                  className="mt-3 w-full"
                  variant={meal.is_available ? "default" : "secondary"}
                >
                  View Details
                </Button>
               </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default ProviderDetailsPage;