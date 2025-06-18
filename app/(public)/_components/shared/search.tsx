import { cn } from "@/lib/utils";
import React from "react";

const SearchComponent = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <form action="/search" className="relative w-full max-w-5xl">
        <input
          name="search"
          type="text"
          placeholder="Where would you like to go?"
          className="w-full p-4 text-lg text-black rounded-md shadow-md border-2"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 transition"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;
