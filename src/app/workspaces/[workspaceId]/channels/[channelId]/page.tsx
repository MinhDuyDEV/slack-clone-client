"use client";

import { Loader, TriangleAlert } from "lucide-react";
import MessageList from "@/components/messages/message-list";
import { useChannelId } from "@/hooks/channels/use-channel-id";
import Header from "@/components/channels/header";
import ChatInput from "@/components/channels/chat-input";
import { useGetChannel } from "@/hooks/channels/use-get-channel";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import { useGetMessages } from "@/hooks/messages/use-get-messages";
import { Message } from "@/interfaces/message.interface";

const ChannelIdPage = () => {
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();
  const { channel, isLoading: channelLoading } = useGetChannel(
    workspaceId,
    channelId
  );
  const { messages } = useGetMessages({
    channelId,
  });

  if (channelLoading)
    return (
      <div className="h-full flex-1 flex gap-y-2 items-center justify-center">
        <Loader className="size-5 animate-spin" />
      </div>
    );

  return (
    <div className="flex flex-col h-full">
      <Header title={channel?.name!} />
      <MessageList
        channelName={channel?.name}
        channelCreationTime={channel?.createdAt}
        data={messages as Message[]}
      />
      <ChatInput placeholder={`Message # ${channel?.name}`} />
    </div>
  );
};

export default ChannelIdPage;
