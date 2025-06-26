"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@/lib/api/use-swr";
import type { TourWithPagination } from "@/types";
import debounce from "lodash/debounce";
import { Grid3X3, List, Search, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { TourCard } from "./tour-card";
import { ToursFilters } from "./tour-filters";

// Mock useQuery hook - replace with your actual implementation
// function useQuery<T>(url: string, key: string) {
//   const [data, setData] = useState<T | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true)
//         // Simulate API call - replace with your actual API call
//         await new Promise((resolve) => setTimeout(resolve, 1000))

//         // Mock response structure
//         const mockResponse = {
//           tours: [
//             {
//               _id: "1",
//               title: "Kerala Backwaters Adventure",
//               description:
//                 "Experience the serene beauty of Kerala's backwaters with traditional houseboat stays and local cuisine.",
//               price: 25000,
//               comparePrice: 30000,
//               city: "Alleppey",
//               state: "Kerala",
//               country: "India",
//               itinerary: [],
//               tags: ["backwaters", "houseboat", "nature"],
//               duration: "5 Days",
//               departureDate: "2024-03-15",
//               groupSize: "8-12 people",
//               status: "ACTIVE" as const,
//               isFeatured: true,
//               images: ["/placeholder.svg?height=300&width=400"],
//               user: {} as any,
//               createdAt: new Date(),
//               updatedAt: new Date(),
//             },
//             {
//               _id: "2",
//               title: "Goa Beach Paradise",
//               description: "Relax on pristine beaches, enjoy water sports, and experience Goa's vibrant nightlife.",
//               price: 18000,
//               comparePrice: 22000,
//               city: "Panaji",
//               state: "Goa",
//               country: "India",
//               itinerary: [],
//               tags: ["beach", "nightlife", "water sports"],
//               duration: "4 Days",
//               departureDate: "2024-03-20",
//               groupSize: "6-10 people",
//               status: "ACTIVE" as const,
//               isFeatured: true,
//               images: ["/placeholder.svg?height=300&width=400"],
//               user: {} as any,
//               createdAt: new Date(),
//               updatedAt: new Date(),
//             },
//             {
//               _id: "3",
//               title: "Himalayan Trek Experience",
//               description: "Challenge yourself with breathtaking mountain views and authentic mountain culture.",
//               price: 35000,
//               comparePrice: 40000,
//               city: "Manali",
//               state: "Himachal Pradesh",
//               country: "India",
//               itinerary: [],
//               tags: ["trekking", "mountains", "adventure"],
//               duration: "7 Days",
//               departureDate: "2024-04-01",
//               groupSize: "4-8 people",
//               status: "ACTIVE" as const,
//               isFeatured: true,
//               images: ["/placeholder.svg?height=300&width=400"],
//               user: {} as any,
//               createdAt: new Date(),
//               updatedAt: new Date(),
//             },
//             {
//               _id: "4",
//               title: "Tamil Nadu Temple Trail",
//               description: "Explore ancient temples and rich cultural heritage of Tamil Nadu.",
//               price: 20000,
//               comparePrice: 25000,
//               city: "Chennai",
//               state: "Tamil Nadu",
//               country: "India",
//               itinerary: [],
//               tags: ["temples", "culture", "heritage"],
//               duration: "6 Days",
//               departureDate: "2024-03-25",
//               groupSize: "10-15 people",
//               status: "ACTIVE" as const,
//               isFeatured: false,
//               images: ["/placeholder.svg?height=300&width=400"],
//               user: {} as any,
//               createdAt: new Date(),
//               updatedAt: new Date(),
//             },
//             {
//               _id: "5",
//               title: "Punjab Cultural Experience",
//               description: "Immerse yourself in Punjab's vibrant culture, food, and traditions.",
//               price: 15000,
//               comparePrice: 18000,
//               city: "Amritsar",
//               state: "Punjab",
//               country: "India",
//               itinerary: [],
//               tags: ["culture", "food", "traditions"],
//               duration: "3 Days",
//               departureDate: "2024-04-05",
//               groupSize: "8-12 people",
//               status: "ACTIVE" as const,
//               isFeatured: false,
//               images: ["/placeholder.svg?height=300&width=400"],
//               user: {} as any,
//               createdAt: new Date(),
//               updatedAt: new Date(),
//             },
//             {
//               _id: "6",
//               title: "Rajasthan Desert Safari",
//               description: "Experience the magic of the Thar Desert with camel rides and desert camping.",
//               price: 28000,
//               comparePrice: 32000,
//               city: "Jaisalmer",
//               state: "Rajasthan",
//               country: "India",
//               itinerary: [],
//               tags: ["desert", "camel safari", "camping"],
//               duration: "5 Days",
//               departureDate: "2024-04-10",
//               groupSize: "6-10 people",
//               status: "ACTIVE" as const,
//               isFeatured: true,
//               images: ["/placeholder.svg?height=300&width=400"],
//               user: {} as any,
//               createdAt: new Date(),
//               updatedAt: new Date(),
//             },
//             {
//               _id: "7",
//               title: "Kashmir Valley Paradise",
//               description: "Discover the breathtaking beauty of Kashmir with Dal Lake and mountain views.",
//               price: 32000,
//               comparePrice: 38000,
//               city: "Srinagar",
//               state: "Jammu and Kashmir",
//               country: "India",
//               itinerary: [],
//               tags: ["mountains", "lakes", "houseboats"],
//               duration: "6 Days",
//               departureDate: "2024-04-15",
//               groupSize: "8-12 people",
//               status: "ACTIVE" as const,
//               isFeatured: true,
//               images: ["/placeholder.svg?height=300&width=400"],
//               user: {} as any,
//               createdAt: new Date(),
//               updatedAt: new Date(),
//             },
//             {
//               _id: "8",
//               title: "Andaman Island Getaway",
//               description: "Pristine beaches, crystal clear waters, and amazing marine life await you.",
//               price: 45000,
//               comparePrice: 50000,
//               city: "Port Blair",
//               state: "Andaman and Nicobar Islands",
//               country: "India",
//               itinerary: [],
//               tags: ["beaches", "snorkeling", "islands"],
//               duration: "7 Days",
//               departureDate: "2024-04-20",
//               groupSize: "4-8 people",
//               status: "ACTIVE" as const,
//               isFeatured: false,
//               images: ["/placeholder.svg?height=300&width=400"],
//               user: {} as any,
//               createdAt: new Date(),
//               updatedAt: new Date(),
//             },
//           ],
//           totalCount: 8,
//           currentPage: 1,
//           totalPages: 1,
//           hasNextPage: false,
//           hasPrevPage: false,
//         }

//         setData(mockResponse as T)
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An error occurred")
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchData()
//   }, [url, key])

//   return { data, isLoading, error }
// }

// interface ToursData {
//   tours: ITour[]
//   totalCount: number
//   currentPage: number
//   totalPages: number
//   hasNextPage: boolean
//   hasPrevPage: boolean
// }

export function ToursListing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  // Get current filters from URL params
  const currentFilters = useMemo(
    () => ({
      search: searchParams.get("search") || "",
      state: searchParams.get("state") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 9,
      sort: searchParams.get("sort") || "featured",
    }),
    [searchParams]
  );

  // Build API URL with current filters
  const apiUrl = useMemo(() => {
    const params = new URLSearchParams();

    if (currentFilters.search) params.set("search", currentFilters.search);
    if (currentFilters.state) params.set("state", currentFilters.state);
    if (currentFilters.minPrice)
      params.set("minPrice", currentFilters.minPrice);
    if (currentFilters.maxPrice)
      params.set("maxPrice", currentFilters.maxPrice);
    params.set("page", currentFilters.page.toString());
    params.set("limit", currentFilters.limit.toString());
    params.set("sort", currentFilters.sort);

    return `/api/v1/tours?${params.toString()}`;
  }, [currentFilters]);

  // Fetch data using the API URL
  const { isLoading, data } = useQuery<TourWithPagination>(apiUrl, apiUrl);

  // Update URL with new filters
  const updateFilters = useCallback(
    (newFilters: Partial<typeof currentFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newFilters).forEach(([key, value]) => {
        if (
          value === "" ||
          value === null ||
          value === undefined ||
          (Array.isArray(value) && value.length === 0)
        ) {
          params.delete(key);
        } else if (Array.isArray(value)) {
          params.set(key, value.join(","));
        } else {
          params.set(key, value.toString());
        }
      });

      // Reset to page 1 when filters change (except when explicitly changing page)
      if (!newFilters.hasOwnProperty("page")) {
        params.set("page", "1");
      }

      router.push(`/tours?${params.toString()}`);
    },
    [searchParams, router]
  );

  const clearFilters = () => {
    router.push("/tours");
  };

  const debouncedUpdateFilters = useMemo(
    () => debounce(updateFilters, 500),
    [updateFilters]
  );

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
    debouncedUpdateFilters({ search });
  };

  const handleSortChange = (sort: string) => {
    updateFilters({ sort });
  };

  const handlePageChange = (page: number) => {
    updateFilters({ page });
  };

  const hasActiveFilters =
    currentFilters.search ||
    currentFilters.state ||
    currentFilters.minPrice ||
    currentFilters.maxPrice;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="h-96 bg-white rounded-xl animate-pulse" />
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-96 bg-white rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tours = data?.tours || [];
  const totalCount = data?.pagination.totalCount || 0;
  const totalPages = data?.pagination.totalPages || 1;
  const currentPage = data?.pagination.currentPage || 1;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div
          className={`lg:col-span-1 ${
            showFilters ? "block" : "hidden lg:block"
          }`}
        >
          <div className="sticky top-24">
            <ToursFilters
              filters={currentFilters}
              onFilterChange={updateFilters}
              onClearFilters={clearFilters}
              totalTours={totalCount}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Search and Controls */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search tours, destinations..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                <Select
                  value={currentFilters.sort}
                  onValueChange={handleSortChange}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="p-2"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="p-2"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                Showing {tours.length} of {totalCount} tours
              </span>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all filters
                </Button>
              )}
            </div>
          </div>

          {/* Tours Grid/List */}
          {tours.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No tours found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters to find more
                tours.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </div>
          ) : (
            <>
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {tours.map((tour) => (
                  <TourCard
                    key={tour._id}
                    tour={tour}
                    variant={viewMode === "list" ? "horizontal" : "vertical"}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => {
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <Button
                              key={page}
                              variant={
                                currentPage === page ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => handlePageChange(page)}
                              className="w-10"
                            >
                              {page}
                            </Button>
                          );
                        } else if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return (
                            <span key={page} className="px-2">
                              ...
                            </span>
                          );
                        }
                        return null;
                      }
                    )}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
