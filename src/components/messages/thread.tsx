import { AlertTriangle, Loader, XIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import Quill from "quill";
import { differenceInMinutes, format, isToday, isYesterday } from "date-fns";
import { useChannelId } from "@/hooks/channels/use-channel-id";
import { Button } from "@/components/ui/button";
import { EditorValue } from "@/lib/types";
import { useGetMessages } from "@/hooks/messages/use-get-messages";
import { useGetMessage } from "@/hooks/messages/use-get-message";
import Message from "./message";
import { useGetMe } from "@/hooks/auth/use-get-me";
import toast from "react-hot-toast";
import { replyToThread } from "@/services/messages";
import { useGetThreadReplies } from "@/hooks/messages/use-get-thread-replies";
import { formatDateLabel } from "@/lib/utils";
import { TIME_THRESHOLD } from "@/lib/constants";
import { useCreateThreadMessage } from "@/hooks/messages/use-create-thread-message";
import { uploadMultipleFiles } from "@/services/upload";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface ThreadProps {
  messageId: string;
  onClose: () => void;
}

const Thread = ({ messageId, onClose }: ThreadProps) => {
  const { me } = useGetMe();
  const channelId = useChannelId();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorKey, setEditorKey] = useState<number>(0);
  const [isPending, setIsPending] = useState<boolean>(false);
  const editorRef = useRef<Quill | null>(null);

  const { message: parentMessage, isLoading: loadingMessage } = useGetMessage(
    channelId,
    messageId
  );
  console.log("parentMessage", parentMessage);
  const { data: replies, isLoading: loadingReplies } = useGetThreadReplies({
    channelId,
    messageId,
  });
  const { mutate: createThreadMessage, isPending: isCreatingMessage } =
    useCreateThreadMessage({
      channelId,
      parentId: messageId,
      userId: me?.id,
    });

  const groupedMessages = replies?.data?.reduce((groups, message) => {
    if (!message) return groups;

    const dateKey = format(new Date(message.createdAt), "yyyy-MM-dd");

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].push(message);
    return groups;
  }, {} as Record<string, typeof replies.data>);

  const handleSubmit = async ({ content, image }: EditorValue) => {
    try {
      setIsPending(true);
      editorRef?.current?.enable(false);
      const values: any = {
        content,
        image,
      };
      if (image instanceof File) {
        const response = await uploadMultipleFiles({
          files: [image],
        });

        console.log("response in uploads", response);

        values.image = response?.data[0].id;
      }
      await createThreadMessage({ content, imageId: values.image });

      setEditorKey((prev) => prev + 1);
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsPending(false);
      editorRef?.current?.enable(true);
    }
  };

  const isLoading = loadingMessage || loadingReplies;

  if (isLoading)
    return (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center h-[49px] px-4 border-b">
          <p className="text-lg font-bold">Thread</p>
          <Button onClick={onClose} size="iconSm" variant="ghost">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        {loadingMessage || loadingReplies ? (
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
        {Object.entries(groupedMessages || {})
          .sort(
            ([dateA], [dateB]) =>
              new Date(dateB).getTime() - new Date(dateA).getTime()
          )
          .map(([dateKey, messages]) => (
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
                console.log("messages", messages);
                return (
                  <Message
                    key={message.id}
                    id={message.id}
                    authorImage={message.user.avatar ?? undefined}
                    authorName={message.user.displayName}
                    isAuthor={message.userId === me?.id}
                    body={message.content}
                    image={message.attachments?.[0]?.url}
                    updatedAt={message.updatedAt}
                    createdAt={message.createdAt}
                    isEditing={editingId === message.id}
                    setEditingId={setEditingId}
                    isCompact={isCompact ?? undefined}
                    hideThreadButton
                    threadCount={message.threadMessagesCount}
                    threadImage={message.user.avatar ?? undefined}
                    threadName={message.user.displayName}
                    threadTimestamp={message.createdAt}
                    edited={message.edited}
                    parentMessageId={message.parentId}
                  />
                );
              })}
            </div>
          ))}

        <Message
          hideThreadButton
          authorImage={parentMessage?.user.avatar ?? undefined}
          authorName={parentMessage?.user.displayName}
          isAuthor={parentMessage?.userId === me?.id}
          body={parentMessage?.content!}
          image={parentMessage?.attachments?.[0]?.url}
          createdAt={parentMessage?.createdAt!}
          updatedAt={parentMessage?.updatedAt!}
          id={parentMessage?.id!}
          isEditing={editingId === parentMessage?.id}
          setEditingId={setEditingId}
          edited={parentMessage?.edited}
          parentMessageId={parentMessage?.parentId}
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
