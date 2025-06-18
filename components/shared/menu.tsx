"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useUser } from "@/lib/api/useUser";
import { cn } from "@/lib/utils";
import { IMenu, IMenuItem } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

type MenuProp = {
  menu: IMenu;
};

export const Menu = ({ menu }: MenuProp) => {
  return Object.keys(menu).map((group) => (
    <SidebarGroup key={group}>
      <SidebarGroupLabel>{group}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {menu[group].items.map((item) => (
            <MenuItem item={item} key={item.title} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));
};

const MenuItem = ({ item }: { item: IMenuItem }) => {
  const pathname = usePathname();
  const params = useParams<{ id: string }>();

  const slug = params.id;

  const { user } = useUser(slug);

  const cleanedPathSegments = pathname.split("/").filter(Boolean);
  const isHome = pathname === `/agent/${user._id}` && item.url === "/";

  const isSegmentMatch =
    item.url !== "/" && cleanedPathSegments.includes(item.url.replace("/", ""));

  const activeRoute = isHome || isSegmentMatch;

  if (!item.items || item.items.length === 0) {
    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild tooltip={item.title}>
          <Link
            href={`/${user.role.toLowerCase()}/${slug}/${item.url}`}
            className={buttonVariants({
              variant: activeRoute ? "sidebarActiveItem" : "sidebarItem",
            })}
          >
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }
  return (
    <Collapsible
      asChild
      defaultOpen={item.isActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title} className="pl-4">
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <Link
                    href={`/agents/${slug}/${subItem.url}`}
                    className={cn(
                      "w-full",
                      buttonVariants({
                        variant: activeRoute
                          ? "sidebarActiveItem"
                          : "sidebarItem",
                      })
                    )}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};
