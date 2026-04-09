"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

type PaginationDemoProps = {
  limit: number;
  page: number;
  totalItems: number;
  totalPage: number;
};

export function PaginationDemo({ meta, startTransition }: { meta: PaginationDemoProps; startTransition: (fn: () => void) => void }) {
  const { page: currentPage, totalPage } = meta;

  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  const searchParams = useSearchParams();
  const router = useRouter();


  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPage) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 🔥 PAGINATION */}
      <Pagination>
        <PaginationContent>
          {/* PREV */}
          <PaginationItem>
            <PaginationPrevious
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : ""
              }
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>

          {/* PAGES */}
          {pages.map((page) => (
            <PaginationItem key={page}>
              <button
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md text-sm ${
                  page === currentPage
                    ? "bg-primary text-white"
                    : "hover:bg-muted"
                }`}
              >
                {page}
              </button>
            </PaginationItem>
          ))}

          {/* NEXT */}
          <PaginationItem>
            <PaginationNext
              className={
                currentPage === totalPage
                  ? "pointer-events-none opacity-50"
                  : ""
              }
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* 🔥 LOADING INDICATOR */}
     
    </div>
  );
}