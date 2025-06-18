"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { post } from "@/lib/api/mutations";
import { userStatus, userStatusMap } from "@/lib/utils";
import { IUser } from "@/types";
import Link from "next/link";
import toast from "react-hot-toast";
import { mutate } from "swr";
// import { DeleteTour } from "@/actions/agents/delete-tour";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: "User",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue, row }) => {
      const status = getValue();

      async function handleStatusUpdate(target: string) {
        if (target == status) {
          return;
        }

        const { error } = await post(
          `/api/v1/users/status/${row.original._id}`,
          {
            status: target,
          }
        );

        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Updated Status");
          mutate("/api/v1/users/agents");
        }
      }

      return (
        <Select
          defaultValue={status as string}
          onValueChange={handleStatusUpdate}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              {userStatus.map((s) => (
                <SelectItem key={s} value={s}>
                  <div className="flex items-center">
                    <span
                      className={`flex w-3 h-3 me-3 rounded-full ${userStatusMap[s].color}`}
                    ></span>
                    <span className="mt-1">{userStatusMap[s].text}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
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

      // const handleDelete = async () => {
      //   const { error } = await deleteRoute(`/api/v1/users/${tour._id}`);

      //   if (!error) {
      //     toast.success("Tour Deleted Successfully!");
      //     mutate("/api/v1/admin/agents");
      //   } else toast.error("Something Went Wrong!");
      // };

      return (
        <div>
          <Button size={"icon"} variant={"ghost"} asChild>
            <Link href={`/agents/${tour._id}`} target="_blank">
              <Eye />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
