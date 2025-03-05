import { useState } from "react";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import { format } from "date-fns";

import { cn, formatFullTime } from "@/lib/utils";
import { usePanel } from "@/hooks/messages/use-panel";
import { useConfirm } from "@/hooks/common/use-confirm";

import Hint from "@/components/hint";
import Toolbar from "@/components/toolbar";
import Thumbnail from "@/components/thumbnail";
import ThreadBar from "@/components/thread-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDeleteMessage } from "@/hooks/messages/use-delete-message";
import { useChannelId } from "@/hooks/channels/use-channel-id";
import { useEditMessage } from "@/hooks/messages/use-edit-message";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });
const Rerender = dynamic(() => import("@/components/rerender"), { ssr: false });

interface MessageProps {
  id: string;
  authorImage?: string;
  authorName?: string;
  isAuthor: boolean;
  body: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  edited: any;
  isEditing: boolean;
  setEditingId: (id: string | null) => void;
  isCompact?: boolean;
  hideThreadButton?: boolean;
  threadCount?: number;
  threadImage?: string;
  threadName?: string;
  threadTimestamp?: string;
  parentMessageId?: string | null;
}

const Message = ({
  id,
  body,
  image,
  createdAt,
  isAuthor,
  isEditing,
  setEditingId,
  authorImage,
  authorName = "Member",
  hideThreadButton,
  isCompact,
  edited,
  threadCount,
  threadImage,
  threadName,
  threadTimestamp,
  parentMessageId,
}: MessageProps) => {
  const channelId = useChannelId();
  const { onOpenMessage } = usePanel();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete message",
    "Are you sure you want to delete this message? This cannot be undone."
  );

  const { mutate: deleteMessage, isPending: isDeleting } = useDeleteMessage({
    channelId,
    parentMessageId: parentMessageId ?? null,
  });
  const { mutate: updateMessage, isPending: isUpdating } = useEditMessage({
    channelId,
    messageId: id,
    parentMessageId: parentMessageId ?? null,
    onSuccess: () => {
      setEditingId(null);
    },
  });

  const avatarFallback = authorName.charAt(0).toUpperCase();

  if (isCompact)
    return (
      <>
        <ConfirmDialog />
        <div
          className={cn(
            "flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative",
            isEditing && "bg-[#F2C74433] hover:bg-[#F2C74433]",
            isDeleting &&
              "bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-200"
          )}
        >
          <div className="flex items-start gap-2">
            <Hint label={formatFullTime(new Date(createdAt))}>
              <button className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 w-10 leading-[22px] text-center hover:underline">
                {format(new Date(createdAt), "hh:mm")}
              </button>
            </Hint>
            {isEditing ? (
              <div className="w-full h-full">
                <Editor
                  onSubmit={updateMessage}
                  disabled={isUpdating}
                  defaultValue={JSON.parse(body)}
                  onCancel={() => setEditingId(null)}
                  variant="update"
                />
              </div>
            ) : (
              <div className="flex flex-col w-full">
                <Thumbnail url={image} />
                <div className="flex items-center gap-1">
                  <Rerender value={body} />
                  {edited !== null ? (
                    <span className="text-xs text-muted-foreground">
                      (edited)
                    </span>
                  ) : null}
                </div>
                <ThreadBar
                  count={threadCount}
                  image={threadImage}
                  name={threadName}
                  timestamp={threadTimestamp}
                  onClick={() => onOpenMessage(id)}
                />
              </div>
            )}
          </div>
          {!isEditing && (
            <Toolbar
              isAuthor={isAuthor}
              isPending={isDeleting}
              handleEdit={() => setEditingId(id)}
              handleThread={() => onOpenMessage(id)}
              handleDelete={() => deleteMessage(id)}
              hideThreadButton={hideThreadButton}
            />
          )}
        </div>
      </>
    );

  return (
    <>
      <ConfirmDialog />
      <div
        className={cn(
          "flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative",
          isEditing && "bg-[#F2C74433] hover:bg-[#F2C74433]",
          isDeleting &&
            "bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-200"
        )}
      >
        <div className="flex items-start gap-2">
          <button>
            <Avatar>
              <AvatarImage
                alt={authorImage}
                src={authorImage}
                className="rounded-md size-10"
              />
              <AvatarFallback className="rounded-md size-10">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          </button>
          {isEditing ? (
            <div className="w-full h-full">
              <Editor
                onSubmit={updateMessage}
                disabled={isUpdating}
                defaultValue={JSON.parse(body)}
                onCancel={() => setEditingId(null)}
                variant="update"
              />
            </div>
          ) : (
            <div className="flex flex-col w-full overflow-hidden">
              <div className="text-sm">
                <button
                  onClick={() => {}}
                  className="font-bold text-primary hover:underline"
                >
                  {authorName}
                </button>
                <span>&nbsp;&nbsp;</span>
                <Hint label={formatFullTime(new Date(createdAt))}>
                  <button className="text-xs text-muted-foreground hover:underline">
                    {format(new Date(createdAt), "h:mm a")}
                  </button>
                </Hint>
              </div>
              <Thumbnail url={image} />
              <div className="flex items-center gap-1">
                <Rerender value={body} />
                {edited !== null ? (
                  <span className="text-xs text-muted-foreground">
                    (edited)
                  </span>
                ) : null}
              </div>
              <ThreadBar
                count={threadCount}
                image={threadImage}
                name={threadName}
                timestamp={threadTimestamp}
                onClick={() => onOpenMessage(id)}
              />
            </div>
          )}
        </div>
        {!isEditing && (
          <Toolbar
            isAuthor={isAuthor}
            isPending={isDeleting}
            handleEdit={() => setEditingId(id)}
            handleThread={() => onOpenMessage(id)}
            handleDelete={() => deleteMessage(id)}
            hideThreadButton={hideThreadButton}
          />
        )}
      </div>
    </>
  );
};

export default Message;
