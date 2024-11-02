"use client";

import Image from "next/image";
import Link from "next/link";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { UserButton } from "@/features/auth/components/user-button";
import { AppSidebar } from "@/components/app-sidebar";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import { CreateProjectModal } from "@/features/projects/components/create-project-modal";
import { CreateTaskModal } from "@/features/tasks/components/create-task-modal";
import { EditTaskModal } from "@/features/tasks/components/edit-task-modal";
import { BreadCrumbView } from "@/components/breadcrumb-view";
import { Suspense } from "react";
import { PageLoader } from "@/components/page-loader";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import logo from "../../../public/logo.svg";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const workspaceId = useWorkspaceId();

  if (workspaceId)
    return (
      <SidebarProvider>
        <Suspense fallback={<PageLoader />}>
          <CreateWorkspaceModal />
          <CreateProjectModal />
          <CreateTaskModal />
          <EditTaskModal />
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-20 shrink-0 items-center justify-between gap-2 px-3">
              <div className="flex flex-1 items-center gap-2 ">
                <SidebarTrigger className="-ml-1" />
                <BreadCrumbView />
              </div>
              <UserButton />
            </header>
            <div className="flex flex-col px-4">{children}</div>
          </SidebarInset>
        </Suspense>
      </SidebarProvider>
    );

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center h-[73px]">
          <Link href="/">
            <Image src={logo} alt="Logo" />
          </Link>
          <UserButton />
        </nav>
        <div className="flex flex-col items-center justify-center py-4">
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
