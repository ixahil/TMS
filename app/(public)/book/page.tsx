"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const BookingPageContent = () => {
  const [tour, setTour] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();

  const tourId = searchParams.get("tour");

  useEffect(() => {
    if (tourId) {
      const fetchTour = async () => {
        const res = await fetch(`/api/tours/${tourId}`);
        const data = await res.json();
        setTour(data);
      };
      fetchTour();
    }
  }, [tourId]);

  const onSubmit = async (formData) => {
    console.log("Booking Data:", formData);
    router.push("/thank-you");
  };

  return (
    <div className="container mx-auto p-6">
      {tour ? (
        <div>
          <h2 className="text-3xl font-bold mb-4">{tour.title}</h2>
          <div className="flex mb-8">
            <div className="w-1/2 pr-4">
              <img
                src={tour.images[0]?.url}
                alt={tour.title}
                className="object-cover w-full h-64 rounded-lg"
              />
            </div>
            <div className="w-1/2">
              <p className="text-lg">{tour.description}</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Booking Form</h3>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className="mt-1 block w-full p-2 border rounded-lg"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="mt-1 block w-full p-2 border rounded-lg"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="tourDate"
                className="block text-sm font-medium text-gray-700"
              >
                Select Tour Date
              </label>
              <input
                type="date"
                id="tourDate"
                {...register("tourDate", { required: "Tour date is required" })}
                className="mt-1 block w-full p-2 border rounded-lg"
              />
              {errors.tourDate && (
                <p className="text-red-500 text-xs">
                  {errors.tourDate.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Book Now
            </Button>
          </form>
        </div>
      ) : (
        <div className="">
          <p>Select your tour...</p>
          <Button asChild>
            <Link href={"/tours"}>Go Back</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

const BookingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingPageContent />
    </Suspense>
  );
};

export default BookingPage;
