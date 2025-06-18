"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Filters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value); // Update or add the query parameter
    router.push(`?${params.toString()}`); // Push the updated query string
  };

  const handleSearchFilter = () => {
    updateQueryParams("search", searchQuery);
  };

  return (
    <div className="w-full flex gap-8">
      <div className="flex items-center gap-2">
        <Label>View</Label>
        <Select
          defaultValue="24"
          onValueChange={(val) => updateQueryParams("limit", val)}
        >
          <SelectTrigger className="w-[72px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24">24</SelectItem>
            <SelectItem value="48">48</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Label>Sort</Label>
        <Select
          defaultValue="asc"
          onValueChange={(val) => updateQueryParams("order", val)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Newer</SelectItem>
            <SelectItem value="desc">Older</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2 w-full">
        <div className="w-full relative">
          <Input
            type="search"
            className="w-full pl-10"
            id="search"
            placeholder="Search for Title"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value === "") {
                handleSearchFilter();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearchFilter();
              }
            }}
          />
          <SearchIcon className="absolute top-2 left-2" size={20} />
        </div>
        <Button onClick={handleSearchFilter}>Filter</Button>
      </div>
    </div>
  );
};

export default Filters;
