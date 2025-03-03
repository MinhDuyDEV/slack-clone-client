import { AlertTriangle, Loader, XIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import Quill from "quill";
import { differenceInMinutes, format, isToday, isYesterday } from "date-fns";
import { useChannelId } from "@/hooks/channels/use-channel-id";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import { Button } from "@/components/ui/button";
import { EditorValue } from "@/lib/types";
import { useGetMessages } from "@/hooks/messages/use-get-messages";
import { useGetMessage } from "@/hooks/messages/use-get-message";
import { Message as MessageType } from "@/interfaces/message.interface";
import { formatDateLabel } from "@/lib/utils";
import { TIME_THRESHOLD } from "@/lib/constants";
import Message from "./message";
import { useGetMe } from "@/hooks/auth/use-get-me";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface ThreadProps {
  messageId: string;
  onClose: () => void;
}

const Thread = ({ messageId, onClose }: ThreadProps) => {
  const { me } = useGetMe();
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorKey, setEditorKey] = useState<number>(0);
  const [isPending, setIsPending] = useState<boolean>(false);
  const editorRef = useRef<Quill | null>(null);

  const { message, isLoading: loadingMessage } = useGetMessage(
    channelId,
    messageId
  );
  const { messages: results, isLoading: loadingMessages } = useGetMessages({
    channelId,
  });

  const groupedMessages = results?.reduce((groups, message) => {
    if (!message) return groups;

    const dateKey = format(new Date(message.createdAt), "yyyy-MM-dd");
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].unshift(message);
    return groups;
  }, {} as Record<string, MessageType[]>);

  const handleSubmit = ({ content }: EditorValue) => {
    setIsPending(true);
    console.log(content);
    setIsPending(false);
  };

  const isLoading = loadingMessage || loadingMessages;

  if (isLoading)
    return (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center h-[49px] px-4 border-b">
          <p className="text-lg font-bold">Thread</p>
          <Button onClick={onClose} size="iconSm" variant="ghost">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        {loadingMessage || loadingMessages ? (
          <div className="flex items-center justify-center h-full">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="flex flex-col gap-y-2 items-center justify-center h-full">
            <AlertTriangle className="size-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Message not found</p>
          </div>
        )}
      </div>
    );

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center h-[49px] px-4 border-b">
        <p className="text-lg font-bold">Thread</p>
        <Button
          onClick={onClose}
          size="iconSm"
          variant="ghost"
          aria-label="Close thread"
        >
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>

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
                message?.user.id === prevMessage.user.id &&
                differenceInMinutes(
                  new Date(message.createdAt),
                  new Date(prevMessage.createdAt)
                ) < TIME_THRESHOLD;
              return (
                <Message
                  key={message.id}
                  id={message.id}
                  memberId={message.userId}
                  authorImage={message.user.avatar ?? undefined}
                  authorName={message.user.displayName}
                  isAuthor={message.userId === me?.id}
                  // reactions={message.reactions}
                  // body={message.body}
                  // image={message.image}
                  updatedAt={message.updatedAt}
                  createdAt={message.createdAt}
                  isEditing={editingId === message.id}
                  setEditingId={setEditingId}
                  isCompact={isCompact ?? undefined}
                  hideThreadButton
                  // threadCount={message.threadCount}
                  // threadImage={message.threadImage}
                  // threadName={message.threadName}
                  // threadTimestamp={message.threadTimestamp}
                  body={message.content}
                  edited={message.edited}
                />
              );
            })}
          </div>
        ))}
        {/* <div
          className='h-1'
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
          <div className='text-center my-2 relative'>
            <hr className='absolute top-1/2 left-0 right-0 border-t border-gray-300' />
            <span className='relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm'>
              <Loader className='size-5 animate-spin' />
            </span>
          </div>
        )} */}
        <Message
          hideThreadButton
          memberId={message?.userId!}
          authorImage={message?.user.avatar ?? undefined}
          authorName={message?.user.displayName}
          isAuthor={message?.userId === me?.id}
          body={message?.content!}
          // image={message.image}
          createdAt={message?.createdAt!}
          updatedAt={message?.updatedAt!}
          id={message?.id!}
          // reactions={message.reactions}
          isEditing={editingId === message?.id}
          setEditingId={setEditingId}
          edited={message?.edited}
        />
      </div>

      <div className="px-4">
        <Editor
          key={editorKey}
          onSubmit={handleSubmit}
          innerRef={editorRef}
          disabled={isPending}
          placeholder="Write a reply..."
        />
      </div>
    </div>
  );
};

export default Thread;
