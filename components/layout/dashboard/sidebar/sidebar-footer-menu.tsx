"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUser } from "@/lib/api/useUser";
import { ChevronUp, User2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export const SidebarFooterMenu = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const { user } = useUser(params.id);

  const handleLogout = async () => {
    await fetch("/api/v1/users/logout", { credentials: "include" });
    router.push(`/${user.role.toLowerCase()}/login`);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="border-2">
            <SidebarMenuButton>
              <User2 /> {user.name}
              {/* {data?.email} */}
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-full">
            <DropdownMenuItem className="w-full">
              <Button
                variant={"ghost"}
                onClick={handleLogout}
                className="w-full"
              >
                <span>Sign out</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
