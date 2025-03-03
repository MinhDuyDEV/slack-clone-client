"use client";

import { Loader, TriangleAlert } from "lucide-react";
import MessageList from "@/components/messages/message-list";
import { useChannelId } from "@/hooks/channels/use-channel-id";
import Header from "@/components/channels/header";
import ChatInput from "@/components/channels/chat-input";
import { useGetChannel } from "@/hooks/channels/use-get-channel";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";

const ChannelIdPage = () => {
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();
  const { channel, isLoading } = useGetChannel(workspaceId, channelId);
  console.log("channel", channel);

  return (
    <div className="flex flex-col h-full">
      <Header title={channel.name} />
      <MessageList
        channelName={channel.name}
        channelCreationTime={channel.createdAt.getTime()}
        // data={results}
        loadMore={() => {}}
        isLoadingMore={false}
        canLoadMore={false}
      />
      <ChatInput placeholder={`Message # ${channel.name}`} />
    </div>
  );
};

export default ChannelIdPage;
