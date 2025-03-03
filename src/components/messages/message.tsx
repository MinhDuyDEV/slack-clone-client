import { useState } from "react";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import { format, isToday, isYesterday } from "date-fns";

import { cn, formatFullTime } from "@/lib/utils";
import { usePanel } from "@/hooks/messages/use-panel";
import { useConfirm } from "@/hooks/common/use-confirm";
import { getReactionsForMessage } from "@/lib/seed-data";

import Hint from "@/components/hint";
import Toolbar from "@/components/toolbar";
import Thumbnail from "@/components/thumbnail";
import Reactions from "@/components/reactions";
import ThreadBar from "@/components/thread-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });
const Rerender = dynamic(() => import("@/components/rerender"), { ssr: false });

interface MessageProps {
  id: string;
  memberId: string;
  authorImage?: string;
  authorName?: string;
  isAuthor: boolean;
  reactions?: Array<{
    _id: string;
    count: number;
    memberIds: string[];
    value: string;
  }>;
  body: string;
  image: string | null | undefined;
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
}

const Message = ({
  id,
  body,
  createdAt,
  image,
  isAuthor,
  isEditing,
  memberId,
  setEditingId,
  updatedAt,
  authorImage,
  authorName = "Member",
  hideThreadButton,
  isCompact,
  reactions,
  edited,
  threadCount,
  threadImage,
  threadName,
  threadTimestamp,
}: MessageProps) => {
  const { parentMessageId, onOpenMessage, onCloseMessage } = usePanel();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete message",
    "Are you sure you want to delete this message? This cannot be undone."
  );

  // Sử dụng state để giả lập các thao tác API
  const [isPending, setIsPending] = useState(false);
  const [localReactions, setLocalReactions] = useState(
    reactions || getReactionsForMessage(id)
  );
  const [localBody, setLocalBody] = useState(body);
  const [isDeleted, setIsDeleted] = useState(false);

  // Giả lập các hàm xử lý
  const handleReaction = (value: string) => {
    setIsPending(true);

    // Giả lập API call
    setTimeout(() => {
      // Tìm reaction hiện tại
      const existingReactionIndex = localReactions.findIndex(
        (r) => r.value === value
      );

      if (existingReactionIndex !== -1) {
        // Kiểm tra xem user hiện tại đã react chưa
        const reaction = localReactions[existingReactionIndex];
        const hasReacted = reaction.memberIds.includes(memberId);

        if (hasReacted) {
          // Nếu đã react thì bỏ react
          const updatedReactions = [...localReactions];
          updatedReactions[existingReactionIndex] = {
            ...reaction,
            count: reaction.count - 1,
            memberIds: reaction.memberIds.filter((id) => id !== memberId),
          };

          // Nếu không còn ai react thì xóa reaction
          if (updatedReactions[existingReactionIndex].count === 0) {
            updatedReactions.splice(existingReactionIndex, 1);
          }

          setLocalReactions(updatedReactions);
        } else {
          // Nếu chưa react thì thêm react
          const updatedReactions = [...localReactions];
          updatedReactions[existingReactionIndex] = {
            ...reaction,
            count: reaction.count + 1,
            memberIds: [...reaction.memberIds, memberId],
          };

          setLocalReactions(updatedReactions);
        }
      } else {
        // Nếu chưa có reaction này thì tạo mới
        setLocalReactions([
          ...localReactions,
          {
            _id: `temp-reaction-${Date.now()}`,
            value,
            count: 1,
            memberIds: [memberId],
          },
        ]);
      }

      setIsPending(false);
      toast.success("Reaction toggled");
    }, 500);
  };

  const handleUpdate = ({ body }: { body: string }) => {
    setIsPending(true);

    // Giả lập API call
    setTimeout(() => {
      setLocalBody(body);
      setEditingId(null);
      setIsPending(false);
      toast.success("Message updated");
    }, 500);
  };

  const handleRemove = async () => {
    const ok = await confirm();
    if (!ok) return;

    setIsPending(true);

    // Giả lập API call
    setTimeout(() => {
      setIsDeleted(true);
      setIsPending(false);
      toast.success("Message deleted");

      if (parentMessageId === id) {
        onCloseMessage();
      }
    }, 500);
  };

  const avatarFallback = authorName.charAt(0).toUpperCase();
  console.log("edited", edited);
  if (isCompact)
    return (
      <>
        <ConfirmDialog />
        <div
          className={cn(
            "flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative",
            isEditing && "bg-[#F2C74433] hover:bg-[#F2C74433]"
            // isRemovingMessage &&
            //   "bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-200"
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
                  onSubmit={handleUpdate}
                  disabled={isPending}
                  defaultValue={JSON.parse(body)}
                  onCancel={() => setEditingId(null)}
                  variant="update"
                />
              </div>
            ) : (
              <div className="flex flex-col w-full">
                <Rerender value={body} />
                <Thumbnail url={image} />
                {edited !== null ? (
                  <span className="text-xs text-muted-foreground">
                    (edited)
                  </span>
                ) : null}
                <Reactions data={reactions || []} onChange={handleReaction} />
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
              isPending={isPending}
              handleEdit={() => setEditingId(id)}
              handleThread={() => onOpenMessage(id)}
              handleDelete={handleRemove}
              handleReaction={handleReaction}
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
          isPending &&
            "bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-200"
        )}
      >
        <div className="flex items-start gap-2">
          <button>
            <Avatar>
              <AvatarImage alt={authorImage} src={authorImage} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
          </button>
          {isEditing ? (
            <div className="w-full h-full">
              <Editor
                onSubmit={handleUpdate}
                disabled={isPending}
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
              <Reactions data={reactions || []} onChange={handleReaction} />
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
            isPending={isPending}
            handleEdit={() => setEditingId(id)}
            handleThread={() => onOpenMessage(id)}
            handleDelete={handleRemove}
            handleReaction={handleReaction}
            hideThreadButton={hideThreadButton}
          />
        )}
      </div>
    </>
  );
};

export default Message;
