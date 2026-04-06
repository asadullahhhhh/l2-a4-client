"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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

export function PaginationDemo({ meta }: { meta: PaginationDemoProps }) {
  const { limit, page: currentPage, totalItems, totalPage } = meta;
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>
        <PaginationItem>
          {pages.map((page) => (
            <PaginationLink
              key={page}
              isActive={page === currentPage}
              href={`?page=${page}`}
            >
              {page}
            </PaginationLink>
          ))}
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={currentPage === totalPage ? "pointer-events-none opacity-50" : ""}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
