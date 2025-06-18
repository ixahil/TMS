"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const TablePagination = ({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) => {
  const searchParams = useSearchParams();

  // Disable the "Previous" button when on the first page
  const prevPage = page > 1 ? page - 1 : 1;

  // Calculate the next page number
  const nextPage = page + 1;

  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  // Build the query string for the page navigation links
  const buildLink = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage.toString());
    return newParams.toString();
  };

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button variant="outline" size="sm" asChild disabled={isFirstPage}>
        <Link
          aria-disabled={isFirstPage}
          href={{ search: buildLink(prevPage) }}
          className="aria-disabled:bg-gray-50 aria-disabled:text-gray-500 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none"
        >
          Previous
        </Link>
      </Button>

      <Button variant="outline" size="sm" asChild disabled={isLastPage}>
        <Link
          aria-disabled={isLastPage}
          className="aria-disabled:bg-gray-50 aria-disabled:text-gray-500 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none"
          href={{ search: buildLink(nextPage) }}
        >
          Next
        </Link>
      </Button>
    </div>
  );
};

export default TablePagination;
