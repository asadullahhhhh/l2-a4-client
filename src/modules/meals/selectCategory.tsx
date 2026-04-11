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
import { useRouter, useSearchParams } from "next/navigation";


export function SelectDemo({ categories, startTransition, ctName, paramName }: { categories: any[]; startTransition: (fn: () => void) => void; ctName: string; paramName: string }) {
    const searchParams = useSearchParams()
    const router = useRouter()

    const params = new URLSearchParams(searchParams.toString())
  return (
    <Select onValueChange={(e) => {
        startTransition(() => {
            params.set(paramName, e)
            router.push(`?${params.toString()}`)
        })
    }}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder={`${ctName}`} />
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
