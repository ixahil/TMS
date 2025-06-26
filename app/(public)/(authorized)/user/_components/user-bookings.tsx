"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@/lib/api/use-swr";
import type { BookingData } from "@/types";
import { Calendar, Clock, Download, Eye, MapPin, Users, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// interface UserBookingsProps {
//   user: IUser;
// }

export function UserBookings() {
  const [activeTab, setActiveTab] = useState("all");

  const { isLoading, data } = useQuery<BookingData>(
    "/api/v1/bookings/user",
    "/api/v1/bookings/user"
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "FAILED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-white rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  console.log(data?.bookings);

  const filterBookings = (status: string) => {
    if (status === "all") return data?.bookings || [];
    return data?.bookings?.filter(
      (booking) => booking.status.toLowerCase() === status
    );
  };

  const filteredBookings = filterBookings(activeTab);

  return (
    <div className="space-y-6">
      {/* Booking Stats */}

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle>My Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {filteredBookings?.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No bookings found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {activeTab === "all"
                      ? "You haven't made any bookings yet."
                      : `No ${activeTab} bookings found.`}
                  </p>
                  <Link href="/tours">
                    <Button>Browse Tours</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBookings?.map((booking) => {
                    const bookingDate = new Date(booking.createdAt);
                    const travelDate = new Date(booking.travelDate);
                    return (
                      <Card key={booking._id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            {/* Tour Image */}
                            <div className="relative md:w-48 h-48 md:h-auto">
                              <Image
                                src={
                                  booking.tour.images[0] ||
                                  "/placeholder.svg?height=200&width=300"
                                }
                                alt={booking.tour.title}
                                fill
                                className="object-cover"
                              />
                            </div>

                            {/* Booking Details */}
                            <div className="flex-1 p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h3 className="text-xl font-semibold mb-2">
                                    {booking.tour.title}
                                  </h3>
                                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-4 w-4" />
                                      {booking.tour.city}, {booking.tour.state}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      {booking.tour.duration}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Users className="h-4 w-4" />
                                      {booking.numberOfTravelers} traveler
                                      {parseInt(booking.numberOfTravelers) > 1
                                        ? "s"
                                        : ""}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 mb-3">
                                    <Badge
                                      className={getStatusColor(booking.status)}
                                    >
                                      {booking.status}
                                    </Badge>
                                    <Badge
                                      className={getPaymentStatusColor(
                                        booking.paymentStatus
                                      )}
                                    >
                                      {booking.paymentStatus}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-orange-600">
                                    ₹
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                                <div>
                                  <span className="text-gray-600">
                                    Booking Date:
                                  </span>
                                  <span className="ml-2 font-medium">
                                    {bookingDate.toDateString()}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-600">
                                    Travel Date:
                                  </span>
                                  <span className="ml-2 font-medium">
                                    {travelDate.toDateString()}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Link href={`/tour/${booking.tour._id}`}>
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Tour
                                  </Button>
                                </Link>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Voucher
                                </Button>
                                {booking.status === "CONFIRMED" &&
                                  booking.paymentStatus === "PAID" && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <X className="h-4 w-4 mr-2" />
                                      Cancel Booking
                                    </Button>
                                  )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
