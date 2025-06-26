import { Suspense } from "react";
import { ToursListing } from "../_components/tour-listing";

export const metadata = {
  title: "All Tours - Discover Amazing Destinations",
  description:
    "Browse through our complete collection of tours and find your perfect adventure.",
};

export default function ToursPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Tours</h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Discover amazing destinations and create unforgettable memories with
            our curated collection of tours
          </p>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="h-96 animate-pulse bg-white mx-4 mt-8 rounded-xl" />
        }
      >
        <ToursListing />
      </Suspense>
    </div>
  );
}
