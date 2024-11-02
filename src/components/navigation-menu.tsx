"use client";

import { SettingsIcon, UsersIcon } from "lucide-react";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { usePathname } from "next/navigation";
import { Projects } from "./projects";

const data = [
  {
    label: "Home",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "My Tasks",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: "Members",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
];

const NavigationMenu = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();

  return (
    <SidebarContent className="px-4">
      <SidebarMenu>
        {data.map((item) => {
          const fullHref = `/workspaces/${workspaceId}${item.href}`;
          const isActive = pathname === fullHref;
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild isActive={isActive} className="py-6">
                <Link href={fullHref}>
                  <Icon style={{ width: "22px", height: "22px" }} />
                  <span className="text-base">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
      {workspaceId && <Projects />}
    </SidebarContent>
  );
};

export default NavigationMenu;
