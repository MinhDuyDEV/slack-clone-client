import { useChannelId } from "@/hooks/use-channel-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useState, useRef } from "react";
import Quill from "quill";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

interface MessageThreadProps {
  messageId: string;
  onClose: () => void;
}

const MessageThread = ({ messageId, onClose }: MessageThreadProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorKey, setEditorKey] = useState<number>(0);
  const [isPending, setIsPending] = useState<boolean>(false);
  const editorRef = useRef<Quill | null>(null);
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();

  const handleSubmit = (body: string) => {
    setIsPending(true);
    console.log(body);
    setIsPending(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center h-[49px] px-4 border-b">
        <p className="text-lg font-bold">Thread Conversation</p>
        <Button
          onClick={onClose}
          size="iconSm"
          variant="ghost"
          aria-label="Close thread"
        >
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>

      {/* <div className='px-4'>
        <Editor
          key={editorKey}
          onSubmit={handleSubmit}
          innerRef={editorRef}
          disabled={isPending}
          placeholder='Write a reply...'
        />
      </div> */}
    </div>
  );
};

export default MessageThread;
