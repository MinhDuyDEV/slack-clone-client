import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import { useGetWorkspace } from "@/hooks/workspaces/use-get-workspace";
import { useGetWorkspaces } from "@/hooks/workspaces/use-get-workspaces";
import { CreateWorkspaceModal } from "@/components/workspaces/create-workspace-modal";
import { useState } from "react";
import { Workspace } from "@/interfaces/workspace.interface";

const WorkspaceSwitcher = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { workspaces, isLoading: workspaceLoading } = useGetWorkspaces();
  const { data: workspace } = useGetWorkspace({
    id: workspaceId,
  });

  const filteredWorkspaces = workspaces?.filter(
    (workspace: Workspace) => workspace.id !== workspaceId
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
          {workspaceLoading ? (
            <Loader className="size-5 animate-spin shrink-0" />
          ) : (
            workspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
          onClick={() => router.push(`/workspaces/${workspaceId}`)}
          className="cursor-pointer flex-col items-start justify-start capitalize"
        >
          {workspace?.name}
          <span className="text-xs text-muted-foreground">
            Active workspace
          </span>
        </DropdownMenuItem>
        {filteredWorkspaces?.map((workspace: Workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onClick={() => router.push(`/workspaces/${workspace.id}`)}
            className="cursor-pointer capitalize overflow-hidden"
          >
            <div className="shrink-0 size-9 relative overflow-hidden bg-[#616061] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
              {workspace.name.charAt(0).toUpperCase()}
            </div>
            <p className="truncate">{workspace.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          onClick={() => setOpen(true)}
          className="cursor-pointer"
        >
          <div className="size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
            <Plus />
          </div>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
      <CreateWorkspaceModal isOpen={open} onClose={() => setOpen(false)} />
    </DropdownMenu>
  );
};

export default WorkspaceSwitcher;
