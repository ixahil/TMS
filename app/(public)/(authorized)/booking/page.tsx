"use client";
import { Loader } from "@/components/ui/loader";
import { useQuery } from "@/lib/api/use-swr";
import { useUserWithoutId } from "@/lib/api/useUser";
import { TourData } from "@/types";
import { useSearchParams } from "next/navigation";
import { BookingForm } from "../../_components/booking-form";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const { user } = useUserWithoutId();
  const tourId = searchParams.get("tourid");

  const { error, data, isLoading } = useQuery<TourData>(
    `/api/v1/tours/${tourId}`,
    `/api/v1/tours/${tourId}`
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <h2>Something went wrong, try again</h2>
        ) : (
          data?.tour && <BookingForm tour={data?.tour} user={user} />
        )}
      </div>
    </div>
  );
}
