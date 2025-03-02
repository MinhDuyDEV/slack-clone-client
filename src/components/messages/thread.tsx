import { XIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import Quill from "quill";

import { useChannelId } from "@/hooks/channels/use-channel-id";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import { Button } from "@/components/ui/button";
import { EditorValue } from "@/lib/types";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface ThreadProps {
  messageId: string;
  onClose: () => void;
}

const Thread = ({ messageId, onClose }: ThreadProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorKey, setEditorKey] = useState<number>(0);
  const [isPending, setIsPending] = useState<boolean>(false);
  const editorRef = useRef<Quill | null>(null);
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();

  const handleSubmit = ({ image, body }: EditorValue) => {
    setIsPending(true);
    console.log(body);
    setIsPending(false);
  };

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
