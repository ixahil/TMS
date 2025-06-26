"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useUser } from "@/lib/api/useUser";
import { ChevronDown } from "lucide-react";
import { useParams } from "next/navigation";

export function SidebarWorkspace() {
  const params = useParams<{ id: string }>();

  const { user } = useUser(params.id);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="border-2">
        <SidebarMenuButton>
          <span className="font-bold">{user.name}</span>
          <ChevronDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
        <DropdownMenuItem>
          <span>{user.name}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
