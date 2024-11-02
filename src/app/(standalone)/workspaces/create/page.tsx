import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";
import { WorkspaceCreatePageClient } from "./client";

const WorkspaceCreatePage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <WorkspaceCreatePageClient />;
};

export default WorkspaceCreatePage;
