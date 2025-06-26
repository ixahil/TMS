"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Filters {
  search: string;
  state: string;
  minPrice: string;
  maxPrice: string;
  page: number;
  limit: number;
  sort: string;
}

interface ToursFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Partial<Filters>) => void;
  onClearFilters: () => void;
  totalTours: number;
}

const states = [
  "Kerala",
  "Goa",
  "Himachal Pradesh",
  "Tamil Nadu",
  "Punjab",
  "Rajasthan",
  "Jammu and Kashmir",
  "Andaman and Nicobar Islands",
  "Maharashtra",
  "Karnataka",
  "Uttarakhand",
  "West Bengal",
];

// const popularTags = [
//   "backwaters",
//   "beach",
//   "mountains",
//   "adventure",
//   "culture",
//   "heritage",
//   "temples",
//   "nature",
//   "trekking",
//   "wildlife",
//   "food",
//   "photography",
//   "spiritual",
//   "family",
//   "honeymoon",
//   "luxury",
// ];

export function ToursFilters({
  filters,
  onFilterChange,
  onClearFilters,
  totalTours,
}: ToursFiltersProps) {
  const [priceRange, setPriceRange] = useState([
    Number(filters.minPrice) || 0,
    Number(filters.maxPrice) || 100000,
  ]);

  useEffect(() => {
    setPriceRange([
      Number(filters.minPrice) || 0,
      Number(filters.maxPrice) || 100000,
    ]);
  }, [filters.minPrice, filters.maxPrice]);

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handlePriceRangeCommit = (value: number[]) => {
    onFilterChange({
      minPrice: value[0] > 0 ? value[0].toString() : "",
      maxPrice: value[1] < 100000 ? value[1].toString() : "",
    });
  };

  // const handleTagToggle = (tag: string) => {
  //   const newTags = filters.tags.includes(tag)
  //     ? filters.tags.filter((t) => t !== tag)
  //     : [...filters.tags, tag];
  //   onFilterChange({ tags: newTags });
  // };

  // const removeTag = (tag: string) => {
  //   onFilterChange({ tags: filters.tags.filter((t) => t !== tag) });
  // };

  const hasActiveFilters =
    filters.state || filters.minPrice || filters.maxPrice;

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="h-5 w-5" />
          Filters
          <Badge variant="secondary" className="ml-auto">
            {totalTours}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Active Filters</Label>
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.state && (
                <Badge variant="secondary" className="gap-1">
                  {filters.state}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => onFilterChange({ state: "" })}
                  />
                </Badge>
              )}
              {/* {filters.duration && (
                <Badge variant="secondary" className="gap-1">
                  {filters.duration} days
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => onFilterChange({ duration: "" })}
                  />
                </Badge>
              )} */}
              {(filters.minPrice || filters.maxPrice) && (
                <Badge variant="secondary" className="gap-1">
                  ₹{filters.minPrice || "0"} - ₹{filters.maxPrice || "100000"}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() =>
                      onFilterChange({ minPrice: "", maxPrice: "" })
                    }
                  />
                </Badge>
              )}
              {/* {filters.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))} */}
            </div>
          </div>
        )}

        {/* State Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Destination State</Label>
          <Select
            value={filters.state}
            onValueChange={(value) =>
              onFilterChange({ state: value === "all" ? "" : value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range</Label>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              onValueCommit={handlePriceRangeCommit}
              max={100000}
              min={0}
              step={1000}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-500">Min Price</Label>
              <Input
                type="number"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => onFilterChange({ minPrice: e.target.value })}
                className="h-8"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500">Max Price</Label>
              <Input
                type="number"
                placeholder="100000"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
                className="h-8"
              />
            </div>
          </div>
        </div>

        {/* Duration Filter */}
        {/* <div className="space-y-3">
          <Label className="text-sm font-medium">Duration</Label>
          <Select
            value={filters.duration}
            onValueChange={(value) =>
              onFilterChange({ duration: value === "any" ? "" : value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Duration</SelectItem>
              <SelectItem value="1-3">1-3 Days</SelectItem>
              <SelectItem value="4-7">4-7 Days</SelectItem>
              <SelectItem value="8-14">8-14 Days</SelectItem>
              <SelectItem value="15+">15+ Days</SelectItem>
            </SelectContent>
          </Select>
        </div> */}

        {/* Tags Filter */}
        {/* <div className="space-y-3">
          <Label className="text-sm font-medium">Tour Types</Label>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {popularTags.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={tag}
                  checked={filters.tags.includes(tag)}
                  onCheckedChange={() => handleTagToggle(tag)}
                />
                <Label
                  htmlFor={tag}
                  className="text-sm font-normal cursor-pointer capitalize"
                >
                  {tag}
                </Label>
              </div>
            ))}
          </div>
        </div> */}

        {/* Quick Filters */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Quick Filters</Label>
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onFilterChange({ minPrice: "0", maxPrice: "20000" })
              }
              className="justify-start text-left"
            >
              Budget Tours (Under ₹20,000)
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
