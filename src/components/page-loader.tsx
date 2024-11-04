import { Loader } from "lucide-react";

export const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
};
