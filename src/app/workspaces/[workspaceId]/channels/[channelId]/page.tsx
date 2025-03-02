"use client";

import { Loader, TriangleAlert } from "lucide-react";
import MessageList from "@/components/messages/message-list";
import { useChannelId } from "@/hooks/channels/use-channel-id";

import Header from "@/components/channels/header";
import ChatInput from "@/components/channels/chat-input";
import { channels } from "@/lib/seed-data";

const ChannelIdPage = () => {
  const channelId = useChannelId();

  const channel = channels.find((c) => c.id === channelId)!;

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
