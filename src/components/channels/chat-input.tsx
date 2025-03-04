import Quill from "quill";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

import { useChannelId } from "@/hooks/channels/use-channel-id";
import { CreateMessageValues } from "@/lib/types";
import { useGetMe } from "@/hooks/auth/use-get-me";
import { useCreateMessage } from "@/hooks/messages/use-create-message";

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

  const { mutate: createMessage, isPending: isCreatingMessage } =
    useCreateMessage({
      channelId,
      userId: me?.id,
    });

  const handleSubmit = async ({ content }: { content: string }) => {
    try {
      setIsPending(true);
      editorRef?.current?.enable(false);

      await createMessage({ content });

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
