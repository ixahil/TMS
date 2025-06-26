"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    // Handle search logic here
    router.push(`/tours?search=${searchQuery}&state=${destination}`);
    console.log({ searchQuery, destination, duration });
  };

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/vecteezy_ai-generated-adventurous-climbers-reach-the-summit-of-a_40750981.jpg"
          alt="Beautiful landscape"
          fill
          className="object-cover"
          priority
          sizes="100vh 100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Discover Your Next
          <span className="block text-yellow-400">Adventure</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Explore breathtaking destinations, create unforgettable memories, and
          embark on journeys that will last a lifetime.
        </p>

        {/* Search Bar */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search Tours
              </label>
              <Input
                placeholder="Where do you want to go?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-gray-300 text-black"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Destination
              </label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger className="border-gray-300 text-black">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kerala">Kerala</SelectItem>
                  <SelectItem value="Goa">Goa</SelectItem>
                  <SelectItem value="Himachal">Himachal Pradesh</SelectItem>
                  <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="Punjab">Punjab</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Duration
              </label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="border-gray-300 text-black">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3">1-3 Days</SelectItem>
                  <SelectItem value="4-7">4-7 Days</SelectItem>
                  <SelectItem value="8-14">8-14 Days</SelectItem>
                  <SelectItem value="15+">15+ Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600 text-white h-11"
              size="lg"
            >
              <Search className="h-4 w-4 mr-2" />
              Search Tours
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
