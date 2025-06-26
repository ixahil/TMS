import { BookingType } from "@/schema/booking";
import { TourSchemaType } from "@/schema/tour";
import { ITour, IUser } from "@/types";

export function getTourValues(tour?: ITour) {
  const schema: TourSchemaType = {
    title: tour?.title || "",
    description: tour?.description || "",
    price: tour?.price || 0,
    comparePrice: tour?.comparePrice || 0,
    city: tour?.city || "",
    state: tour?.state || "",
    country: tour?.country || "India",
    status: tour?.status || "DRAFT",
    images: tour?.images || [],
    itinerary: tour?.itinerary?.length
      ? tour.itinerary
      : [{ label: "Day 1", description: "Day 1 Todo" }],
    duration: tour?.duration || "",
    departureDate: tour?.departureDate || "",
    groupSize: tour?.groupSize || "",
    isFeatured: tour?.isFeatured || false,
  };

  return schema;
}

export function getBookingValues(user?: IUser) {
  const schema: BookingType = {
    email: user?.email || "",
    emergencyPhone: "",
    firstName: user?.name || "",
    lastName: user?.name || "",
    numberOfTravelers: "1",
    phone: "",
    travelDate: "",
  };

  return schema;
}
