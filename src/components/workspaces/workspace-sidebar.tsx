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
import { useCreateChannelModal } from "@/store/use-create-channel-modal";
import UserItem from "@/components/workspaces/user-item";
import SidebarItem from "@/components/workspaces/sidebar-item";
import WorkspaceHeader from "@/components/workspaces/workspace-header";
import WorkspaceSection from "@/components/workspaces/workspace-section";

import { workspaces, channels, members, users } from "@/lib/seed-data";

const WorkspaceSidebar = () => {
  const memberId = useMemberId();
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const [_open, setOpen] = useCreateChannelModal();

  const currentWorkspace = workspaces.find((w) => w.id === workspaceId)!;
  const currentMember = members.find((m) => m.id === memberId);

  return (
    <div className="flex flex-col bg-[#5E2C5F] h-full">
      <WorkspaceHeader
        workspace={currentWorkspace}
        isAdmin={currentMember?.role === "ADMIN"}
      />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />
        <SidebarItem label="Drafts & Sent" icon={SendHorizonal} id="drafts" />
      </div>
      <WorkspaceSection
        label="Channels"
        hint="New channel"
        onNew={
          currentMember?.role === "ADMIN" ? () => setOpen(true) : undefined
        }
      >
        {channels.map((channel) => (
          <SidebarItem
            key={channel.id}
            icon={HashIcon}
            label={channel.name}
            id={channel.id}
            variant={channelId === channel.id ? "active" : "default"}
          />
        ))}
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
    </div>
  );
};

export default WorkspaceSidebar;
