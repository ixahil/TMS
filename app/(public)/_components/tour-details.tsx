"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ITour } from "@/types";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Star,
  Share2,
  Heart,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ItinerarySection from "./itinerary-section";

export function TourDetails({ tour }: { tour: ITour }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const discount =
    tour.comparePrice > tour.price
      ? Math.round(((tour.comparePrice - tour.price) / tour.comparePrice) * 100)
      : 0;

  const inclusions = [
    "Accommodation in premium hotels/houseboats",
    "All meals as per itinerary",
    "Professional tour guide",
    "Transportation in AC vehicle",
    "All entry fees and permits",
    "24/7 customer support",
  ];

  const exclusions = [
    "International/domestic flights",
    "Personal expenses",
    "Travel insurance",
    "Tips and gratuities",
    "Alcoholic beverages",
    "Items not mentioned in inclusions",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[500px]">
            {/* Main Image */}
            <div className="lg:col-span-2 relative rounded-xl overflow-hidden">
              <Image
                src={
                  tour.images[selectedImageIndex] ||
                  "/placeholder.svg?height=500&width=800"
                }
                alt={tour.title}
                fill
                className="object-cover"
                priority
              />
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white">
                  {discount}% OFF
                </Badge>
              )}
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {tour.images.slice(1, 5).map((image, index) => (
                <div
                  key={index + 1}
                  className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                    selectedImageIndex === index + 1
                      ? "ring-2 ring-orange-500"
                      : "hover:opacity-80"
                  }`}
                  onClick={() => setSelectedImageIndex(index + 1)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${tour.title} ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                  {index === 3 && tour.images.length > 5 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        +{tour.images.length - 5} more
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4" />
                    {tour.city}, {tour.state}, {tour.country}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {tour.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>4.8 (124 reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {tour.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {tour.groupSize}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? "text-red-500 border-red-500" : ""}
                  >
                    <Heart
                      className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                    />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {tour.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">
                {tour.description}
              </p>
            </div>

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Detailed Itinerary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ItinerarySection
                  itinerary={tour.itinerary}
                  title={tour.title}
                />
              </CardContent>
            </Card>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">
                    Whats Included
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {inclusions.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">
                    Whats Not Included
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {exclusions.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <div className="w-4 h-4 border border-red-300 rounded-full mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-orange-600">
                        ₹{tour.price.toLocaleString()}
                      </span>
                      {tour.comparePrice > tour.price && (
                        <span className="text-lg text-gray-500 line-through">
                          ₹{tour.comparePrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">per person</p>
                    {discount > 0 && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        Save ₹
                        {(tour.comparePrice - tour.price).toLocaleString()}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-sm text-gray-600">Duration</span>
                      <span className="font-medium">{tour.duration}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-sm text-gray-600">Group Size</span>
                      <span className="font-medium">{tour.groupSize}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-sm text-gray-600">
                        Next Departure
                      </span>
                      <span className="font-medium">{tour.departureDate}</span>
                    </div>
                  </div>

                  <Link href={`/booking?tourid=${tour._id}`} className="block">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold">
                      Book Now
                    </Button>
                  </Link>

                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                      Free cancellation up to 24 hours before departure
                    </p>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-3">
                    <h4 className="font-semibold">Need Help?</h4>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>📞 Call us: +91 9876543210</p>
                      <p>📧 Email: support@tours.com</p>
                      <p>💬 Live chat available 24/7</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
