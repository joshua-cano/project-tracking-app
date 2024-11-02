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

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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
};

export default DashboardLayout;
