import { redirect } from "next/navigation";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";
import { getCurrent } from "@/features/auth/queries";

const WorkspaceCreatePage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className="w-full lg:max-w-xl">
      {JSON.stringify(user)}
      <CreateWorkspaceForm />
    </div>
  );
};

export default WorkspaceCreatePage;
