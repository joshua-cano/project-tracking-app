"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

import { ProjectAvatar } from "@/features/projects/components/project-avatar";

export const Projects = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetProjects({ workspaceId });
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {data?.documents?.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
        const isActive = pathname === href;

        return (
          <SidebarMenuItem key={project.$id}>
            <SidebarMenuButton asChild isActive={isActive} size="lg">
              <Link href={href} prefetch={true}>
                <ProjectAvatar image={project.imageUrl} name={project.name} />
                <span className="text-base truncate">{project.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};
