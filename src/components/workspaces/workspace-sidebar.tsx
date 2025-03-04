import { useState } from "react";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  LockIcon,
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

import { useGetWorkspace } from "@/hooks/workspaces/use-get-workspace";
import { useGetChannels } from "@/hooks/channels/use-get-channels";
import { CreateChannelModal } from "@/components/channels/create-channel-modal";
import { Section } from "@/interfaces/section.interface";
import { Channel } from "@/interfaces/channel.interface";

const WorkspaceSidebar = () => {
  const memberId = useMemberId();
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] =
    useState(false);

  const { data: workspace } = useGetWorkspace({
    id: workspaceId,
  });
  if (!workspace) {
    return null;
  }

  const isActive = (id: string) => {
    if (id === channelId) return "active";
    return "default";
  };

  return (
    <div className="flex flex-col bg-[#5E2C5F] h-full">
      {!workspace ? (
        <Loader className="size-4 animate-spin" />
      ) : (
        <WorkspaceHeader workspace={workspace} />
      )}

      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />
        <SidebarItem label="Drafts & Sent" icon={SendHorizonal} id="drafts" />
      </div>

      {workspace.sections.map((section: Section) => {
        return (
          <WorkspaceSection
            key={section.id}
            label={section.name}
            sectionId={section.id}
          >
            {section.channels.map((channel: Channel) => {
              if (channel.type === "direct") {
                return (
                  <UserItem
                    key={channel.id}
                    id={channel.id}
                    image={channel.userId}
                    label={channel.name}
                    variant={isActive(channel.id)}
                  />
                );
              } else {
                return (
                  <SidebarItem
                    key={channel.id}
                    label={channel.name}
                    icon={channel.type === "public" ? HashIcon : LockIcon}
                    id={channel.id}
                    variant={isActive(channel.id)}
                  />
                );
              }
            })}
          </WorkspaceSection>
        );
      })}

      {/* <CreateChannelModal
        isOpen={isCreateChannelModalOpen}
        onClose={() => setIsCreateChannelModalOpen(false)}
        sectionId={}
      /> */}
    </div>
  );
};

export default WorkspaceSidebar;
