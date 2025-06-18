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

type MenuProp = {
  menu: IMenu;
};

export function AppSidebar({ menu }: MenuProp) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
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
