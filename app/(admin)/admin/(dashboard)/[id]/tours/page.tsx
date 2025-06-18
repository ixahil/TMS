"use client";

import { ContentLayout } from "@/components/layouts/content-layout";
import { DataTable } from "@/components/shared/data-table";
import TablePagination from "@/components/shared/data-table/table-pagination";
import Filters from "@/components/shared/filters";
import { Button } from "@/components/ui/button";
import { useQuery } from "@/lib/api/use-swr";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { columns } from "./columns";
import { exportData } from "@/lib/utils";
import { TourWithPagination } from "@/types";

const Tours = () => {
  const searchParams = useSearchParams();

  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const order = searchParams.get("order") || "asc";
  const search = searchParams.get("search") || "";

  const { data, mutate, isLoading, error } = useQuery<TourWithPagination>(
    `/api/v1/admin/tours?limit=${limit}&page=${page}&order=${order}&search=${search}`,
    "/api/v1/admin/tours"
  );

  useEffect(() => {
    mutate();
  }, [mutate, limit, search, order, page]);

  const totalCount = data?.pagination.totalCount || 0;

  const totalPages = data?.pagination.totalPages || 0;

  const handleExport = () => {
    exportData(data?.tours as object[], {
      fileName: "tours",
      fileType: "xlsx",
    });
  };

  return (
    <ContentLayout
      title={`Tours (${totalCount})`}
      className="space-y-8"
      isLoading={isLoading}
      error={error}
    >
      <div className="flex justify-between">
        <div className="">
          <Filters />
        </div>
        <div className="flex gap-2">
          <Button size={"sm"} onClick={handleExport}>
            Export
          </Button>
          {/* <Button size={"sm"}>Import</Button> */}
          <Button size={"sm"} asChild>
            <Link href={"tours/new"}>Add Tour</Link>
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {data && (
          <>
            <DataTable data={data?.tours} columns={columns} />
            <TablePagination page={page} totalPages={totalPages} />
          </>
        )}
      </div>
    </ContentLayout>
  );
};

export default Tours;
