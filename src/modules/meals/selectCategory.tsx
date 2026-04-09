"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

type Category = {
  created_at: string;
  description: string;
  id: string;
  name: string;
  updated_at: string;
};

export function SelectDemo({ categories, startTransition }: { categories: Category[]; startTransition: (fn: () => void) => void }) {
    const router = useRouter()
  return (
    <Select onValueChange={(e) => {
        startTransition(() => {
            router.push(`?${new URLSearchParams({category_id: e}).toString()}`)
        })
    }}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {
            categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
