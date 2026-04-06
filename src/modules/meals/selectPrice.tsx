"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const priceRanges = [
  { label: "0 - 49", min: 0, max: 49 },
  { label: "50 - 99", min: 50, max: 99 },
  { label: "100+", min: 100, max: 1000 },
];

export function PriceFilterSelect() {
  const router = useRouter();
  const searchParams = useSearchParams()

  return (
    <Select
      onValueChange={(value) => {
        const selected = priceRanges.find((r) => r.label === value);

        if (!selected) return;

        const params = new URLSearchParams(searchParams.toString());

        params.set("min_price", String(selected.min));
        params.set("max_price", String(selected.max));

        router.push(`?${params.toString()}`);
      }}
    >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select price range" />
      </SelectTrigger>

      <SelectContent>
        {priceRanges.map((range) => (
          <SelectItem key={range.label} value={range.label}>
            {range.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}