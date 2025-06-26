import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ITour } from "@/types";
import { Calendar, MapPin, Users, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TourCardProps {
  tour: ITour;
  variant?: "vertical" | "horizontal";
}

export function TourCard({ tour, variant = "vertical" }: TourCardProps) {
  const discount =
    tour.comparePrice > tour.price
      ? Math.round(((tour.comparePrice - tour.price) / tour.comparePrice) * 100)
      : 0;

  if (variant === "horizontal") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-1/2 h-64 md:h-auto">
            <Image
              src={tour.images[0] || "/placeholder.svg?height=300&width=400"}
              alt={tour.title}
              fill
              className="object-cover"
            />
            {discount > 0 && (
              <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                {discount}% OFF
              </Badge>
            )}
          </div>
          <CardContent className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4" />
                {tour.city}, {tour.state}
              </div>
              <h3 className="text-xl font-bold mb-2 line-clamp-2">
                {tour.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {tour.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {tour.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                {tour.duration && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {tour.duration}
                  </div>
                )}
                {tour.groupSize && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {tour.groupSize}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-orange-600">
                  ₹{tour.price.toLocaleString()}
                </span>
                {tour.comparePrice > tour.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{tour.comparePrice.toLocaleString()}
                  </span>
                )}
              </div>
              <Link href={`/tour/${tour._id}`}>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  View Details
                </Button>
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative h-64">
        <Image
          src={tour.images[0] || "/placeholder.svg?height=300&width=400"}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
            {discount}% OFF
          </Badge>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <MapPin className="h-4 w-4" />
          {tour.city}, {tour.state}
        </div>

        <h3 className="text-xl font-bold mb-2 line-clamp-2">{tour.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{tour.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tour.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          {tour.duration && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {tour.duration}
            </div>
          )}
          {tour.groupSize && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {tour.groupSize}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-600">
              ₹{tour.price.toLocaleString()}
            </span>
            {tour.comparePrice > tour.price && (
              <span className="text-sm text-gray-500 line-through">
                ₹{tour.comparePrice.toLocaleString()}
              </span>
            )}
          </div>
          <Link href={`/tour/${tour._id}`}>
            <Button className="bg-orange-500 hover:bg-orange-600">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
