"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { LogOut, SettingsIcon, UsersIcon, ChevronsUpDown } from "lucide-react";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import { CreateProjectModal } from "@/features/projects/components/create-project-modal";
import { CreateTaskModal } from "@/features/tasks/components/create-task-modal";
import { EditTaskModal } from "@/features/tasks/components/edit-task-modal";
import { BreadCrumbView } from "@/components/breadcrumb-view";
import { Separator } from "@/components/ui/separator";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";
import { RiAddCircleFill } from "react-icons/ri";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useCurrent } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/use-logout";
import { Icons } from "@/components/icons";
import { Projects } from "@/components/projects";

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

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();

  const { open: openWorkspaceModal } = useCreateWorkspaceModal();
  const { open: openProjectModal } = useCreateProjectModal();

  const { data: workspaces } = useGetWorkspaces();

  const { data: user } = useCurrent();
  const { mutate: logout } = useLogout();

  const avatarFallback = user?.name
    ? user?.name.charAt(0).toUpperCase()
    : user?.email.charAt(0).toUpperCase();

  const [activeWorkspaceId, setActiveWorkspaceId] = React.useState("");

  let activeWorkspace = workspaces?.documents.find(
    (w) => w.$id === activeWorkspaceId
  );

  if (!activeWorkspace) activeWorkspace = workspaces?.documents[0];

  return (
    <SidebarProvider>
      <CreateWorkspaceModal />
      <CreateProjectModal />
      <CreateTaskModal />
      <EditTaskModal />

      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Link
            href="/"
            className="flex items-center gap-1 py-2 group-data-[collapsible=icon]:p-0"
          >
            <Icons.logo />
            <span className="text-2xl font-semibold leading-none group-data-[collapsible=icon]:hidden">
              TaskFlow
            </span>
          </Link>

          <Separator />
        </SidebarHeader>
        {workspaceId ? (
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="justify-between [&>svg]:size-5">
                <span className="text-sm">Workspaces</span>
                <RiAddCircleFill
                  onClick={openWorkspaceModal}
                  className="cursor-pointer hover:opacity-75 transition fill-foreground"
                />
              </SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground gap-3"
                      >
                        <WorkspaceAvatar
                          name={activeWorkspace?.name ?? ""}
                          image={activeWorkspace?.imageUrl}
                        />
                        <div className="truncate text-base font-semibold">
                          {activeWorkspace?.name}
                        </div>
                        <ChevronsUpDown className="ml-auto" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                      align="start"
                      side="bottom"
                      sideOffset={4}
                    >
                      <DropdownMenuLabel className="text-xs text-muted-foreground">
                        Workspaces
                      </DropdownMenuLabel>
                      {workspaces?.documents.map((workspace, index) => (
                        <DropdownMenuItem
                          key={workspace.$id}
                          onClick={() => {
                            setActiveWorkspaceId(workspace.$id);
                            router.push(`/workspaces/${workspace.$id}`);
                          }}
                          className="gap-3 p-2"
                        >
                          <WorkspaceAvatar
                            name={workspace.name}
                            image={workspace.imageUrl}
                          />
                          {workspace.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <Separator />

            <SidebarGroup>
              <SidebarMenu>
                {data.map((item) => {
                  const fullHref = `/workspaces/${workspaceId}${item.href}`;
                  const isActive = pathname === fullHref;
                  const Icon = isActive ? item.activeIcon : item.icon;

                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={fullHref}>
                          <Icon className="size-8" />
                          <span className="">{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
              <SidebarGroupLabel className="justify-between [&>svg]:size-5 items-center">
                <span className="text-sm">Projects</span>
                <RiAddCircleFill
                  onClick={openProjectModal}
                  className="cursor-pointer hover:opacity-75 transition w-full fill-foreground"
                />
              </SidebarGroupLabel>
              <Projects />
            </SidebarGroup>
          </SidebarContent>
        ) : (
          <SidebarContent />
        )}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg ">
                      <AvatarFallback className="rounded-lg">
                        {avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.name}
                      </span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarFallback className="rounded-lg">
                          {avatarFallback}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user?.name}
                        </span>
                        <span className="truncate text-xs">{user?.email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <Separator className="my-2" />
                  <DropdownMenuItem
                    onClick={() => logout()}
                    className="font-medium cursor-pointer"
                  >
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        {workspaceId ? (
          <>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <BreadCrumbView />
              </div>
            </header>
            <div className="flex flex-col px-4">{children}</div>
          </>
        ) : (
          <div className="flex min-h-screen flex-col items-center justify-center py-4 bg-background">
            {children}
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
