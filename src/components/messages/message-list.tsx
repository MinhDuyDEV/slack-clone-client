import { useState } from "react";
import { Loader } from "lucide-react";
import { differenceInMinutes, format } from "date-fns";

import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import {
  messages,
  members,
  channels,
  getThreadCount,
  getThreadImage,
  getThreadName,
} from "@/lib/seed-data";

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
  variant?: "channel" | "thread" | "conversation";
  data: MessageType[];
}

const MessageList = ({
  data: messages,
  memberImage,
  memberName,
  variant = "channel",
  channelName,
  channelCreationTime,
}: MessageListProps) => {
  const workspaceId = useWorkspaceId();
  const [editingId, setEditingId] = useState<string | null>(null);

  const { me } = useGetMe();
  if (!me) return null;

  const groupedMessages = messages.reduce(
    (groups: any, message: MessageType) => {
      const date = message.createdAt;
      const dateKey = format(date, "yyyy-MM-dd");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
      return groups;
    },
    {} as Record<string, MessageType[]>
  );

  return (
    <div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto messages-scrollbar">
      {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
        <div key={dateKey}>
          <div className="text-center my-2 relative">
            <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
            <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
              {formatDateLabel(dateKey)}
            </span>
          </div>
          {(messages as MessageType[]).map(
            (message: MessageType, index: number) => {
              if (!message) return null;
              const prevMessage = (messages as MessageType[])[index - 1];
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
                  authorImage={message.user.avatar ?? undefined}
                  authorName={message.user.displayName}
                  isAuthor={message.userId === me.id}
                  edited={message.edited}
                  body={message.content}
                  updatedAt={message.updatedAt}
                  createdAt={message.createdAt}
                  isEditing={editingId === message.id}
                  setEditingId={setEditingId}
                  isCompact={isCompact ?? undefined}
                  hideThreadButton={variant === "thread"}
                  threadCount={message.threadMessagesCount}
                  threadImage={message.user.avatar ?? undefined}
                  threadName={message.user.displayName}
                  threadTimestamp={message.createdAt}
                />
              );
            }
          )}
        </div>
      ))}

      {variant === "channel" && channelName && channelCreationTime && (
        <ChannelHero
          channelName={channelName}
          creationTime={channelCreationTime}
        />
      )}
      {variant === "conversation" && (
        <ConversationHero name={memberName} image={memberImage} />
      )}
    </div>
  );
};

export default MessageList;
