"use client";

import FormField from "@/components/shared/form-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { post } from "@/lib/api/mutations";
import { getBookingValues } from "@/lib/form-helper";
import { BookingSchema, BookingType } from "@/schema/booking";
import type { ITour, IUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, CreditCard, Loader2, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function BookingForm({ tour, user }: { tour: ITour; user: IUser }) {
  const form = useForm<BookingType>({
    resolver: zodResolver(BookingSchema),
    defaultValues: getBookingValues(user),
  });

  const { numberOfTravelers } = form.getValues();

  const onSubmit = async (formData: BookingType) => {
    toast.loading("Creating booking...", { id: "saving" });

    const { error } = await post("/api/v1/bookings", {
      tourId: tour._id,
      userId: user?._id,
      ...formData,
    });
    if (error) {
      toast.error(error.message);
      form.setError("root", {
        type: "validate",
        message: error.message,
      });
    } else {
      toast.success("Booking Succesfull!");
    }
    toast.dismiss("saving");
  };

  const totalPrice = tour.price * parseInt(form.watch("numberOfTravelers"));
  const discount =
    tour.comparePrice > tour.price
      ? (tour.comparePrice - tour.price) *
        parseInt(form.watch("numberOfTravelers"))
      : 0;

  return form.formState.isSubmitSuccessful ? (
    <div className="text-center mb-8">
      <h4 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
        <CheckCircle className="text-green-500" /> <span>Booking Success!</span>
      </h4>
      <Button asChild variant={"outline"}>
        <Link href={`/user?tab=booking`} className="text-gray-600">
          Check your bookings
        </Link>
      </Button>
    </div>
  ) : (
    <div className="">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Complete Your Booking
        </h1>
        <p className="text-gray-600">
          Just a few more steps to confirm your amazing journey
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-2 space-y-2">
          <span>{form.formState.errors.root?.message}</span>
          <FormProvider {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      name="firstName"
                      label="First Name"
                      type="text"
                    />

                    <FormField name="lastName" label="Last Name" type="text" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField name="email" label="Email" type="text" />

                    <FormField name="phone" label="Phone" type="number" />
                  </div>
                </CardContent>
              </Card>

              {/* Travel Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Travel Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    name="numberOfTravelers"
                    label="Number of Travelers"
                    type="number"
                  />
                  <FormField
                    name="travelDate"
                    label="Travel Date"
                    type="date"
                  />
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      name="emergencyPhone"
                      label="Emergency phone"
                      type="tel"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="terms"
                        className="mt-1"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the{" "}
                        <a href="#" className="text-orange-600 hover:underline">
                          Terms and Conditions
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-orange-600 hover:underline">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" id="newsletter" className="mt-1" />
                      <label
                        htmlFor="newsletter"
                        className="text-sm text-gray-600"
                      >
                        I would like to receive updates and promotional offers
                        via email
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Book Now
              </Button>
            </form>
          </FormProvider>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Tour Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={
                        tour.images[0] || "/placeholder.svg?height=80&width=80"
                      }
                      alt={tour.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold line-clamp-2">{tour.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                      <span className="text-sm">
                        {tour.city}, {tour.state}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Departure:</span>
                    <span>{tour.departureDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Travelers:</span>
                    <span>{numberOfTravelers}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Price Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Price per person:</span>
                  <span>₹{tour.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Number of travelers:</span>
                  <span>×{numberOfTravelers}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount:</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount:</span>
                  <span className="text-orange-600">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Free cancellation up to 24hrs</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="h-4 w-4 text-green-500" />
                    <span>Multiple payment options</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
