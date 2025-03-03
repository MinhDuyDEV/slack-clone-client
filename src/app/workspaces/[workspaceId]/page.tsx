"use client";

import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import { AlertTriangle, Loader } from "lucide-react";
import { useGetWorkspace } from "@/hooks/workspaces/use-get-workspace";

const WorkspaceIdPage = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { data: workspace, isLoading } = useGetWorkspace({ id: workspaceId });

  if (isLoading)
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <Loader className="size-5 animate-spin text-muted-foreground" />
      </div>
    );

  if (!workspace)
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <AlertTriangle className="size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Workspace not found
        </span>
      </div>
    );

  // if (!isAdmin || !channelId) {
  //   return (
  //     <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
  //       <AlertTriangle className="size-5 text-muted-foreground" />
  //       <span className="text-sm text-muted-foreground">No channel found</span>
  //     </div>
  //   );
  // }

  return null;
};

export default WorkspaceIdPage;
