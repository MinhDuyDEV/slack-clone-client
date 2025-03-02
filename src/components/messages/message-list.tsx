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

import Message from "@/components/messages/message";
import ChannelHero from "@/components/channel-hero";
import ConversationHero from "@/components/conversation-hero";
import { TIME_THRESHOLD } from "@/lib/constants";
import { formatDateLabel } from "@/lib/utils";
import { useChannelId } from "@/hooks/channels/use-channel-id";

interface MessageListProps {
  memberName?: string;
  memberImage?: string;
  channelName?: string;
  channelCreationTime?: number;
  variant?: "channel" | "thread" | "conversation";
  // data: GetMessagesReturnType | undefined;
  loadMore: () => void;
  isLoadingMore: boolean;
  canLoadMore: boolean;
}

const MessageList = ({
  // canLoadMore,
  // data,
  // isLoadingMore,
  // loadMore,
  // channelCreationTime,
  // channelName,
  memberImage,
  memberName,
  variant = "channel",
  channelName,
  channelCreationTime,
}: MessageListProps) => {
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const [editingId, setEditingId] = useState<string | null>(null);

  // Giả lập loading states
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [page, setPage] = useState(1);

  // Giả sử user hiện tại là user-1
  const currentUserId = "user-1";
  const currentMember = members.find(
    (m) => m.workspaceId === workspaceId && m.userId === currentUserId
  );

  // Lọc tin nhắn theo kênh hiện tại
  const filteredMessages = messages
    .filter((message) => {
      if (variant === "channel") {
        return message.channelId === channelId && !message.parentMessageId;
      } else if (variant === "thread" && channelId) {
        return message.parentMessageId === channelId;
      } else if (variant === "conversation") {
        // Giả sử conversation là giữa currentUser và memberName
        return false; // Implement logic cho conversation nếu cần
      }
      return false;
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Sắp xếp theo thời gian giảm dần

  // Phân trang tin nhắn
  const messagesPerPage = 20;
  const paginatedMessages = filteredMessages.slice(0, page * messagesPerPage);

  // Hàm load thêm tin nhắn
  const loadMore = () => {
    if (isLoadingMore || !canLoadMore) return;

    setIsLoadingMore(true);

    // Giả lập API call
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setIsLoadingMore(false);

      // Kiểm tra xem còn tin nhắn để load không
      if (page * messagesPerPage >= filteredMessages.length) {
        setCanLoadMore(false);
      }
    }, 1000);
  };

  // Nhóm tin nhắn theo ngày
  const groupedMessages = paginatedMessages.reduce((groups, message) => {
    const date = message.createdAt;
    const dateKey = format(date, "yyyy-MM-dd");
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(message);
    return groups;
  }, {} as Record<string, typeof paginatedMessages>);

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
          {messages.map((message, index) => {
            if (!message) return null;
            const prevMessage = messages[index - 1];
            const isCompact =
              prevMessage &&
              message?.senderId === prevMessage.senderId &&
              differenceInMinutes(
                new Date(message.createdAt),
                new Date(prevMessage.createdAt)
              ) < TIME_THRESHOLD;
            return (
              <Message
                key={message.id}
                id={message.id}
                memberId={message.senderId}
                authorImage={message.senderId}
                authorName={message.senderId}
                isAuthor={message.senderId === currentUserId}
                reactions={[]}
                body={message.body}
                image={message.senderId}
                updatedAt={message.updatedAt.getTime()}
                createdAt={message.createdAt.getTime()}
                isEditing={editingId === message.id}
                setEditingId={setEditingId}
                isCompact={isCompact ?? undefined}
                hideThreadButton={variant === "thread"}
                threadCount={getThreadCount(message.id)}
                threadImage={getThreadImage(message.id)}
                threadName={getThreadName(message.id)}
                threadTimestamp={message.createdAt.getTime()}
              />
            );
          })}
        </div>
      ))}
      <div
        className="h-1"
        ref={(el) => {
          if (el) {
            const observer = new IntersectionObserver(
              ([entry]) => {
                if (entry.isIntersecting && canLoadMore) {
                  loadMore();
                }
              },
              {
                threshold: 1.0,
              }
            );

            observer.observe(el);
            return () => observer.disconnect();
          }
        }}
      />
      {isLoadingMore && (
        <div className="text-center my-2 relative">
          <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
          <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
            <Loader className="size-5 animate-spin" />
          </span>
        </div>
      )}
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
