"use client";

import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { DottedSeparator } from "./dotted-separator";
import { WorkspaceSwitcher } from "./workspace-switcher";
import logo from "../../public/logo.svg";
import dynamic from "next/dynamic";

const NavigationMenu = dynamic(() => import("../components/navigation-menu"), {
  ssr: false,
});

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader className="p-4">
        <Link href="/">
          <Image src={logo} alt="logo" priority />
        </Link>
        <DottedSeparator className="my-2" />
        <WorkspaceSwitcher />
        <DottedSeparator className="my-2" />
      </SidebarHeader>
      <NavigationMenu />
    </Sidebar>
  );
}
