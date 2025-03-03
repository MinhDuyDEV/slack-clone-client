import Quill from "quill";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

import { useChannelId } from "@/hooks/channels/use-channel-id";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import { createMessage } from "@/services/messages";
import { CreateMessageValues } from "@/lib/types";
import { useGetMe } from "@/hooks/auth/use-get-me";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface ChatInputProps {
  placeholder?: string;
}

const ChatInput = ({ placeholder }: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState<number>(0);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { me } = useGetMe();
  const channelId = useChannelId();
  const editorRef = useRef<Quill | null>(null);

  const handleSubmit = async ({ content }: { content: string }) => {
    try {
      setIsPending(true);
      editorRef?.current?.enable(false);

      const values: CreateMessageValues = {
        channelId,
        content,
        userId: me.id,
      };

      const message = await createMessage(values);

      setEditorKey((prev) => prev + 1);
    } catch {
      toast.error("Failed to send message");
    } finally {
      setIsPending(false);
      editorRef?.current?.enable(true);
    }
  };

  return (
    <div className="px-5 w-full">
      <Editor
        key={editorKey}
        placeholder={placeholder}
        onSubmit={handleSubmit}
        disabled={isPending}
        innerRef={editorRef}
      />
    </div>
  );
};

export default ChatInput;
