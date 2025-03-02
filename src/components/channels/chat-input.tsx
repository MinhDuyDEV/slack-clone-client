import Quill from "quill";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

import { useChannelId } from "@/hooks/channels/use-channel-id";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface ChatInputProps {
  placeholder?: string;
}

type CreateMessageValues = {
  channelId: string;
  workspaceId: string;
  body: string;
  image: string | undefined;
};

const ChatInput = ({ placeholder }: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState<number>(0);
  const [isPending, setIsPending] = useState<boolean>(false);

  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();
  const editorRef = useRef<Quill | null>(null);

  const handleSubmit = async ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => {
    try {
      setIsPending(true);
      editorRef?.current?.enable(false);

      const values: CreateMessageValues = {
        channelId,
        workspaceId,
        body,
        image: undefined,
      };
      if (image) {
        // const url = await generateUploadUrl({}, { throwError: true });
        const url = "https://api.cloudinary.com/v1_1/dqzqzqzq/image/upload";
        if (!url) throw new Error("Failed to generate upload url");

        const result = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": image.type },
          body: image,
        });
        if (!result.ok) throw new Error("Failed to upload image");

        const { storageId } = await result.json();
        values.image = storageId;
      }

      // await createMessage(values, { throwError: true });

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
