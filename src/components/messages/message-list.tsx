import { useState } from "react";
import { differenceInMinutes, format } from "date-fns";

import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";

import ChannelHero from "@/components/channel-hero";
import ConversationHero from "@/components/conversation-hero";
import { TIME_THRESHOLD } from "@/lib/constants";
import { formatDateLabel } from "@/lib/utils";
import Message from "./message";
import { useGetMe } from "@/hooks/auth/use-get-me";
import { Message as MessageType } from "@/interfaces/message.interface";

interface MessageListProps {
  memberName?: string;
  memberImage?: string;
  channelName?: string;
  channelCreationTime?: string;
  type?: "private" | "public" | "direct";
  data: MessageType[];
}

const MessageList = ({
  data: messages,
  memberImage,
  memberName,
  type = "public",
  channelName,
  channelCreationTime,
}: MessageListProps) => {
  const workspaceId = useWorkspaceId();
  const [editingId, setEditingId] = useState<string | null>(null);

  const { me } = useGetMe();
  if (!me) return null;

  console.log("MessageList received messages:", messages);

  // Sort messages by date in ascending order (oldest first)
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const groupedMessages = sortedMessages.reduce(
    (groups: Record<string, MessageType[]>, message: MessageType) => {
      const date = new Date(message.createdAt);
      const dateKey = format(date, "yyyy-MM-dd");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
      return groups;
    },
    {}
  );

  console.log("Grouped messages:", groupedMessages);

  return (
    <div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto messages-scrollbar">
      {Object.entries(groupedMessages)
        .sort(
          ([dateA], [dateB]) =>
            new Date(dateA).getTime() - new Date(dateB).getTime()
        )
        .reverse()
        .map(([dateKey, messages]) => (
          <div key={dateKey}>
            <div className="text-center my-2 relative">
              <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
              <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
                {formatDateLabel(dateKey)}
              </span>
            </div>
            {messages.map((message: MessageType, index: number) => {
              if (!message) return null;
              const prevMessage = messages[index - 1];
              const isCompact =
                prevMessage &&
                message.userId === prevMessage.userId &&
                differenceInMinutes(
                  new Date(message.createdAt),
                  new Date(prevMessage.createdAt)
                ) < TIME_THRESHOLD;

              return (
                <Message
                  key={message.id}
                  id={message.id}
                  authorImage={message.user?.avatar ?? undefined}
                  authorName={message.user?.displayName}
                  isAuthor={message.userId === me.id}
                  edited={message.edited}
                  body={message.content}
                  updatedAt={message.updatedAt}
                  createdAt={message.createdAt}
                  isEditing={editingId === message.id}
                  setEditingId={setEditingId}
                  isCompact={isCompact ?? undefined}
                  hideThreadButton={type === "private"}
                  threadCount={message.threadMessagesCount}
                  threadImage={message.user?.avatar ?? undefined}
                  threadName={message.user?.displayName}
                  threadTimestamp={message.createdAt}
                />
              );
            })}
          </div>
        ))}

      {(type === "private" || type === "public") &&
        channelName &&
        channelCreationTime && (
          <ChannelHero
            channelName={channelName}
            creationTime={channelCreationTime}
          />
        )}
      {type === "direct" && (
        <ConversationHero name={memberName} image={memberImage} />
      )}
    </div>
  );
};

export default MessageList;
