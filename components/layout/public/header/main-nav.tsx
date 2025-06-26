"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { siteConfig } from "@/configs/site";

type NavLink = {
  label: string;
  url: string;
  children?: {
    label: string;
    url: string;
    children?: {
      label: string;
      url: string;
    }[];
  }[];
};

export const MainNav = () => {
  return (
    <div className="mr-4 hidden md:flex justify-between">
      <Link href="/" className="mr-12 flex items-center space-x-2 lg:mr-6">
        <span className="hidden font-bold lg:inline-block text-xl underline text-orange-500">
          {siteConfig.name}
        </span>
      </Link>
      <NavigationMenus />
    </div>
  );
};

function NavigationMenus() {
  function listItemRenderer(items: NavLink[]) {
    return items.map((item) => {
      const hashChildren = item.children || null;
      return (
        <NavigationMenuItem key={item.url}>
          {hashChildren ? (
            <>
              <NavigationMenuTrigger className="text-sm font-medium hover:bg-orange-300 hover:text-black focus:bg-orange-300 focus:text-black active:bg-orange-300">
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-8 p-6 md:w-[400px] lg:w-[1000px] lg:grid-cols-[auto_auto_auto]">
                  {item.children?.map((childItem) =>
                    childItem.children ? (
                      <li key={childItem.url}>
                        <div>
                          <span className="font-bold mb-2">
                            {childItem.label}
                          </span>
                          <hr className="" />
                        </div>
                        <ul className="py-2">
                          {childItem.children.map((grandChildItem) => (
                            <ListItem
                              className="p-1"
                              href={grandChildItem.url}
                              title={grandChildItem.label}
                              key={grandChildItem.url}
                            ></ListItem>
                          ))}
                        </ul>
                      </li>
                    ) : (
                      <ListItem
                        href={childItem.url}
                        title={childItem.label}
                        key={childItem.url}
                      ></ListItem>
                    )
                  )}
                </ul>
              </NavigationMenuContent>
            </>
          ) : (
            <Link href="#" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-sm font-medium hover:bg-orange-300 hover:text-black focus:bg-orange-300 focus:text-black`}
              >
                {item.label}
              </NavigationMenuLink>
            </Link>
          )}
        </NavigationMenuItem>
      );
    });
  }
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {listItemRenderer(siteConfig.navLinks)}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-300 hover:text-black focus:bg-orange-300 focus:text-black",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
