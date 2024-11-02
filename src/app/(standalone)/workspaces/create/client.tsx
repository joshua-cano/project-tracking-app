"use client";

import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";

export const WorkspaceCreatePageClient = () => {
  return (
    <div className="w-full lg:max-w-2xl">
      <CreateWorkspaceForm />
    </div>
  );
};
