import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { WorkspaceIdSettingsPageClient } from "./client";

const WorkspaceIdSettingsPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <WorkspaceIdSettingsPageClient />;
};

export default WorkspaceIdSettingsPage;
