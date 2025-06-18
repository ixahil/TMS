"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@/lib/api/use-swr";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SectionLayout from "../_components/layouts/section-layout";
import { TourFilters } from "../_components/shared/tour-filters";
import TablePagination from "../_components/table-pagination";

const SearchPage = () => {
  const searchParams = useSearchParams();

  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const order = searchParams.get("order") || "asc";
  const search = searchParams.get("search") || "";
  const state = searchParams.getAll("state") || "";
  const country = searchParams.get("country") || "";

  const { data } = useQuery(
    `/api/v1/tours?limit=${limit}&page=${page}&order=${order}&search=${search}&state=${state}&country=${country}`,
    `/api/v1/tours?`
  );
  const { data: citiesNStates } = useQuery(
    "/api/v1/tours/cities-states",
    "/api/v1/tours/cities-states"
  );

  const totalCount = data?.pagination.totalCount || 10;

  const totalPages = data?.pagination.totalPages || 1;

  const states = citiesNStates?.flatMap((cityState) => cityState.state);

  const countries = citiesNStates?.flatMap((cityState) => cityState.country);

  if (!data) {
    <SectionLayout title={`All Tours`}>
      <p>No Result Found</p>
    </SectionLayout>;
  }

  return (
    <SectionLayout title={`All Tours`}>
      <div className="grid grid-cols-8 gap-4">
        {/* Left Sidebar for Filters */}
        <div className="col-span-2 bg-white p-6 border rounded-lg shadow-md">
          <TourFilters countries={countries} states={states} />
        </div>

        {/* Tours List */}
        <div className="col-span-6">
          <div className="grid grid-cols-3 gap-4">
            {data?.tours.map((item, idx) => (
              <Card key={item.title + item.id}>
                <Link href={`/tours/${item.id}`}>
                  <CardContent className="relative rounded-lg overflow-hidden flex aspect-square items-center justify-center shadow-lg transition-transform transform hover:scale-105">
                    <Image
                      src={
                        item.images[0] ? item.images[0] : "/placeholder.webp"
                      }
                      alt={item.title}
                      layout="fill"
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-2 w-full">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-sm">{`₹${item.price}`}</p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
          <TablePagination page={page} totalPages={totalPages} />
        </div>
      </div>
    </SectionLayout>
  );
};

export default SearchPage;
