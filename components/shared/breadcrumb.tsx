"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useUser } from "@/lib/api/useUser";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export const AppBreadcrumb = () => {
  const params = useParams();

  const { user } = useUser(params.id as string);

  // Fetch headers from next/headers
  const pathname = usePathname();

  // Get the pathname from headers

  // Extract paths from the pathname (slice starting from index 3 to skip the first two segments)
  const paths = pathname?.split("/").slice(3);

  // Extract the slug (second part of the path)
  const slug = pathname?.split("/")[2];

  // If no pathname, return an empty breadcrumb
  if (!pathname) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home breadcrumb link */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/${user.role.toLowerCase()}/${slug}`}>{"Home"}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {/* Loop through paths and create each breadcrumb item */}
        {paths?.map((path, index) => {
          const isLastPath = paths.length === index + 1;

          // Generate full URL for each breadcrumb item dynamically
          const linkHref = `/${user.role.toLowerCase()}/${[
            slug,
            ...paths.slice(0, index + 1),
          ].join("/")}`;

          return (
            <React.Fragment key={path + index}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  {isLastPath ? (
                    <p>{path}</p> // Display last path as text
                  ) : (
                    <Link className="capitalize" href={linkHref}>
                      {path} {/* Link to intermediate paths */}
                    </Link>
                  )}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {isLastPath ? null : <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
