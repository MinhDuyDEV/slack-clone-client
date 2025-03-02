import { MdOutlineAddReaction } from "react-icons/md";

import { cn } from "@/lib/utils";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";

import Hint from "@/components/hint";
import EmojiPopover from "@/components/emoji-popover";
import { getReactionsForMessage, members } from "@/lib/seed-data";

interface ReactionsProps {
  data?: Array<{
    _id: string;
    value: string;
    count: number;
    memberIds: string[];
  }>;
  messageId?: string;
  onChange: (value: string) => void;
}

const Reactions = ({ data, onChange, messageId }: ReactionsProps) => {
  const workspaceId = useWorkspaceId();

  // Sử dụng seed data thay vì API
  // Giả sử user hiện tại là user-1
  const currentUserId = "user-1";
  const currentMember = members.find(
    (m) => m.workspaceId === workspaceId && m.userId === currentUserId
  );
  const currentMemberId = currentMember?.id;

  // Lấy reactions từ seed data nếu không có data được truyền vào
  const reactionsData =
    data || (messageId ? getReactionsForMessage(messageId) : []);

  if (reactionsData.length === 0 || !currentMemberId) return null;

  return (
    <div className="flex items-center gap-1 my-1">
      {reactionsData.map((reaction) => (
        <Hint
          key={reaction._id}
          label={`${reaction.count} ${
            reaction.count === 1 ? "person" : "people"
          } reacted with ${reaction.value}`}
        >
          <button
            onClick={() => onChange(reaction.value)}
            className={cn(
              "h-6 px-2 py-1 rounded-full bg-slate-200/70 border border-transparent text-slate-800 flex items-center gap-x-1",
              reaction.memberIds.includes(currentMemberId) &&
                "bg-blue-100/70 border-blue-500 text-white"
            )}
          >
            {reaction.value}
            <span
              className={cn(
                "text-xs font-semibold text-muted-foreground",
                reaction.memberIds.includes(currentMemberId) && "text-blue-500"
              )}
            >
              {reaction.count}
            </span>
          </button>
        </Hint>
      ))}
      <EmojiPopover
        hint="Add reaction"
        onEmojiSelect={(emoji) => onChange(emoji.native)}
      >
        <button className="h-6 px-2 py-1 rounded-full bg-slate-200/70 border border-transparent hover:border-slate-500 text-slate-800 flex items-center gap-x-1">
          <MdOutlineAddReaction className="size-4" />
        </button>
      </EmojiPopover>
    </div>
  );
};

export default Reactions;
