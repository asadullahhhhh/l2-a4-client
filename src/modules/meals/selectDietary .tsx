"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const filters = [
  { label: "Available", value: "is_available" },
  { label: "Vegetarian", value: "is_vegetarian" },
  { label: "Vegan", value: "is_vegan" },
  { label: "Halal", value: "is_halal" },
  { label: "Gluten Free", value: "is_gluten_free" },
];

export function MealFilterSelect( { startTransition }: { startTransition: (fn: () => void) => void }) {
  const router = useRouter();

  return (
    <Select
      onValueChange={(key) => {
        const params = new URLSearchParams();

        params.set(key, "true"); // 🔥 dynamic key

        startTransition(() => {
          router.push(`?${params.toString()}`);
        })
      }}
    >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Filter meals" />
      </SelectTrigger>

      <SelectContent>
        {filters.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}