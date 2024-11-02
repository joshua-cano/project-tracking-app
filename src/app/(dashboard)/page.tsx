import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { getWorkspaces } from "@/features/workspaces/queries";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";

export default async function Home() {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  const workspaces = await getWorkspaces();

  if (workspaces.total === 0) {
    return (
      <div className="w-full lg:max-w-xl">
        <CreateWorkspaceForm />
      </div>
    );
  } else {
    redirect(`/workspaces/${workspaces.documents[0].$id}`);
  }
}
