"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Eye, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { deleteRoute } from "@/lib/api/mutations";
import { tourStatusMap } from "@/lib/utils";
import { ITour } from "@/types";
import Link from "next/link";
import toast from "react-hot-toast";
import { mutate } from "swr";
// import { DeleteTour } from "@/actions/tours/delete-tour";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ITour>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "location",
    cell: ({ row }) => {
      const tour = row.original;
      const location = `${tour.state}, ${tour.country}`;
      return location;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as keyof typeof tourStatusMap;

      return (
        <div className="flex items-center">
          <span
            className={`flex w-3 h-3 me-3 rounded-full ${tourStatusMap[status].color}`}
          ></span>
          <span className="mt-1">{tourStatusMap[status].text}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string).toDateString();
      return date;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const tour = row.original;

      const handleDelete = async () => {
        const { error, data } = await deleteRoute(
          `/api/v1/agents/tours/${tour._id}`
        );

        console.log(data, error);
        if (!error) {
          toast.success("Tour Deleted Successfully!");
          mutate("/api/v1/agents/tours");
        } else toast.error("Something Went Wrong!");
      };

      return (
        <div>
          <Button size={"icon"} variant={"ghost"} asChild>
            <Link href={`/tour/${tour._id}`} target="_blank">
              <Eye />
            </Link>
          </Button>
          <Button size={"icon"} variant={"ghost"} asChild>
            <Link href={`tours/${tour._id}`}>
              <Edit2 size={16} className="text-green-700" />
            </Link>
          </Button>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={handleDelete}
            className="cursor-pointer"
          >
            <Trash2 size={16} className="text-destructive" />
          </Button>
        </div>
      );
    },
  },
];
