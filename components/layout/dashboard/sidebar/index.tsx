"use client";

import { Menu } from "@/components/shared/menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { IMenu } from "@/types";
import { SidebarFooterMenu } from "./sidebar-footer-menu";
import { SidebarWorkspace } from "./sidebar-workspace";
import { useParams } from "next/navigation";
import { useUser } from "@/lib/api/useUser";

type MenuProp = {
  menu: IMenu;
};

export function AppSidebar({ menu }: MenuProp) {
  const params = useParams<{ id: string }>();

  const { user } = useUser(params.id);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <h3 className="text-center">{user.role}</h3>
        <SidebarMenu>
          <SidebarWorkspace />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <Menu menu={menu} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
