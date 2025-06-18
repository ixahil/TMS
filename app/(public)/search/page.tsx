import { Card, CardContent } from "@/components/ui/card";
import { getCitiesNStates, getTours } from "@/lib/api/queries/tour";
import { headers } from "next/headers";
import Image from "next/image";
import SectionLayout from "../_components/layouts/section-layout";
import TablePagination from "../_components/table-pagination";
import { TourFilters } from "../_components/shared/tour-filters";
import Link from "next/link";

const SearchPage = async () => {
  const headersList = await headers();

  const xUrl = headersList.get("x-url") || "";

  // const slug = headersList.get("x-pathname")?.split("/")[2];

  const url = new URL(xUrl);

  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const order = url.searchParams.get("order") || "asc";
  const search = url.searchParams.get("search") || "";
  const city = url.searchParams.getAll("city") || "";
  const state = url.searchParams.getAll("state") || "";
  const country = url.searchParams.get("country") || "";

  const { data } = await getTours(
    `limit=${limit}&page=${page}&order=${order}&search=${search}&city=${city}&state=${state}&country=${country}`
  );

  const { data: citiesNStates } = await getCitiesNStates();

  const totalCount = data?.pagination.totalCount || 10;

  const totalPages = data?.pagination.totalPages || 1;

  const states = citiesNStates?.flatMap((cityState) => cityState.state);

  const countries = citiesNStates?.flatMap((cityState) => cityState.country);

  if (!data?.tours) {
    <SectionLayout title={`Search Results for ${search}`}>
      <p>No Result Found</p>
    </SectionLayout>;
  }

  return (
    <SectionLayout
      title={`Search Results for ${search} - ${data?.pagination?.totalCount}`}
    >
      <div className="grid grid-cols-8 gap-4">
        {/* Left Sidebar for Filters */}
        <div className="col-span-2 bg-white p-6 border rounded-lg shadow-md">
          <TourFilters countries={countries} states={states} />
        </div>
        <div className="col-span-6">
          <div className="grid grid-cols-3 gap-4">
            {data?.tours?.map((item, idx) => (
              <Card key={item.title + idx}>
                <Link href={`/tours/${item.id}`}>
                  <CardContent className="relative rounded-lg overflow-hidden flex aspect-square items-center justify-center shadow-lg transition-transform transform hover:scale-105">
                    <Image
                      src={
                        item.images[0]?.url
                          ? item.images[0]?.url
                          : "/placeholder.webp"
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
        </div>
      </div>
      <TablePagination page={page} totalPages={totalPages} />
    </SectionLayout>
  );
};

export default SearchPage;
