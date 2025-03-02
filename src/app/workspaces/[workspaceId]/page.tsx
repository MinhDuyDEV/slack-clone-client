"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import { useCreateChannelModal } from "@/store/use-create-channel-modal";
import { members } from "@/lib/seed-data";
import { workspaces } from "@/lib/seed-data";
import { getWorkspaceChannels } from "@/lib/seed-data";
import { AlertTriangle, Loader } from "lucide-react";

const WorkspaceIdPage = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelModal();

  // Sử dụng seed data thay vì API calls
  const currentWorkspace = workspaces.find((w) => w.id === workspaceId);
  const workspaceChannels = getWorkspaceChannels(workspaceId || "");

  // Giả sử user hiện tại là user-1
  const currentUserId = "user-1";
  const currentMember = members.find(
    (m) => m.workspaceId === workspaceId && m.userId === currentUserId
  );

  const channelId = useMemo(
    () => workspaceChannels[0]?.id,
    [workspaceChannels]
  );
  const isAdmin = useMemo(
    () => currentMember?.role === "ADMIN",
    [currentMember?.role]
  );

  // Giả lập loading states
  const isLoading = false;

  useEffect(() => {
    if (isLoading || !currentMember || !currentWorkspace) return;

    if (channelId) {
      router.push(`/workspaces/${workspaceId}/channels/${channelId}`);
    } else if (!open && isAdmin) {
      setOpen(true);
    }
  }, [
    channelId,
    isAdmin,
    currentMember,
    open,
    router,
    setOpen,
    currentWorkspace,
    workspaceId,
    isLoading,
  ]);

  if (isLoading)
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <Loader className="size-5 animate-spin text-muted-foreground" />
      </div>
    );

  if (!currentWorkspace || !currentMember)
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <AlertTriangle className="size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Workspace not found
        </span>
      </div>
    );

  if (!isAdmin || !channelId) {
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <AlertTriangle className="size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">No channel found</span>
      </div>
    );
  }

  return null;
};

export default WorkspaceIdPage;
