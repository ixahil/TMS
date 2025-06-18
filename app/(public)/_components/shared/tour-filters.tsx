"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const TourFilters = ({ countries, states }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pushQuery = (name, query) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const currentCities = searchParams.getAll(name);

    if (currentCities.includes(query)) {
      // Remove the city if it's already selected
      newParams.delete(name, query);
    } else {
      // Add the city if it's not selected
      newParams.append(name, query);
    }

    // Update the URL with new query parameters
    router.push(`?${newParams.toString()}`);
  };

  return (
    <>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Filters</h3>

      {/* State Filter */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-700 mb-3">States</h4>
        <div className="flex flex-col space-y-3">
          {states?.map((c) => (
            <div key={c} className="flex items-center">
              <input
                type="checkbox"
                name={c}
                id={c + " state"}
                className="mr-2 rounded text-primary-500 focus:ring-2 focus:ring-primary-300"
                onChange={() => pushQuery("state", c)}
                checked={searchParams.getAll("state").includes(c)}
              />
              <label htmlFor={c} className="text-sm text-gray-600">
                {c}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Country Filter */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-700 mb-3">Countries</h4>
        <div className="flex flex-col space-y-3">
          {countries?.map((c) => (
            <div key={c} className="flex items-center">
              <input
                type="checkbox"
                name={c}
                id={c}
                className="mr-2 rounded text-primary-500 focus:ring-2 focus:ring-primary-300"
                onChange={() => pushQuery("country", c)}
                checked={searchParams.getAll("country").includes(c)}
              />
              <label htmlFor={c} className="text-sm text-gray-600">
                {c}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
