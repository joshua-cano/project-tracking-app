"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";

const pathnameMap = {
  tasks: {
    title: "Tasks",
  },
  projects: {
    title: "Projects",
  },
  settings: {
    title: "Settings",
  },
  members: {
    title: "Members",
  },
  join: {
    title: "Join Workspace",
  },
};

const defaultMap = {
  title: "Home",
};

export const BreadCrumbView = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;
  const secondaryPathnameKey = pathnameParts[5] as keyof typeof pathnameMap;

  const { title: primaryTitle } = pathnameMap[pathnameKey] || defaultMap;
  const { title: secondaryTitle } = pathnameMap[secondaryPathnameKey] ?? "";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage className="line-clamp-1">
            {primaryTitle}
          </BreadcrumbPage>
        </BreadcrumbItem>
        {secondaryPathnameKey && (
          <Separator orientation="vertical" className="mr-2 h-4" />
        )}
        <BreadcrumbItem>
          <BreadcrumbPage className="line-clamp-1">
            {secondaryTitle}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
