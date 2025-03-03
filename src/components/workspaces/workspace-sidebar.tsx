import { useState } from "react";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";
import { useMemberId } from "@/hooks/members/use-member-id";
import { useChannelId } from "@/hooks/channels/use-channel-id";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import UserItem from "@/components/workspaces/user-item";
import SidebarItem from "@/components/workspaces/sidebar-item";
import WorkspaceHeader from "@/components/workspaces/workspace-header";
import WorkspaceSection from "@/components/workspaces/workspace-section";

import { members, users } from "@/lib/seed-data";
import { useGetWorkspace } from "@/hooks/workspaces/use-get-workspace";
import { useGetChannels } from "@/hooks/channels/use-get-channels";
import { CreateChannelModal } from "@/components/channels/create-channel-modal";

const WorkspaceSidebar = () => {
  const memberId = useMemberId();
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] =
    useState(false);

  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  return (
    <div className="flex flex-col bg-[#5E2C5F] h-full">
      {workspaceLoading ? (
        <Loader className="size-4 animate-spin" />
      ) : (
        <WorkspaceHeader workspace={workspace} />
      )}

      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />
        <SidebarItem label="Drafts & Sent" icon={SendHorizonal} id="drafts" />
      </div>

      <WorkspaceSection
        label="Channels"
        hint="New channel"
        onNew={() => setIsCreateChannelModalOpen(true)}
      >
        {channelsLoading ? (
          <Loader className="size-4 animate-spin self-center" />
        ) : (
          channels?.map((channel: any) => (
            <SidebarItem
              key={channel.id}
              icon={HashIcon}
              label={channel.name}
              id={channel.id}
              variant={channelId === channel.id ? "active" : "default"}
            />
          ))
        )}
      </WorkspaceSection>

      <WorkspaceSection
        label="Direct messages"
        hint="New direct message"
        onNew={() => {}}
      >
        {members.map((member) => (
          <UserItem
            key={member.id}
            id={member.id}
            image={users.find((u) => u.id === member.userId)?.imageUrl}
            label={users.find((u) => u.id === member.userId)?.username}
            variant={memberId === member.id ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>

      <CreateChannelModal
        isOpen={isCreateChannelModalOpen}
        onClose={() => setIsCreateChannelModalOpen(false)}
        sectionId={channels?.[0].sectionId}
      />
    </div>
  );
};

export default WorkspaceSidebar;
