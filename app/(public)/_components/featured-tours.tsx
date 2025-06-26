"use client";

import { useQuery } from "@/lib/api/use-swr";
import { ToursData } from "@/types";
import { TourCard } from "./tour-card";

export function FeaturedTours() {
  const { isLoading, data } = useQuery<ToursData>(
    "/api/v1/tours/featured",
    "/api/v1/tours/featured"
  );

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted animate-pulse rounded w-64 mx-auto mb-4" />
            <div className="h-4 bg-muted animate-pulse rounded w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Tours
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of extraordinary travel
            experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.tours.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
