import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editMessage } from "@/services/messages";
import { EditorValue } from "@/lib/types";
import toast from "react-hot-toast";

interface UseEditMessageProps {
  channelId: string;
  messageId: string;
  parentMessageId: string | null;
  onSuccess?: () => void;
}

export const useEditMessage = ({
  channelId,
  messageId,
  onSuccess,
  parentMessageId,
}: UseEditMessageProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content }: EditorValue) =>
      editMessage(channelId, messageId, content),
    onSuccess: () => {
      toast.success("Message updated");

      // Invalidate channel messages
      queryClient.invalidateQueries({ queryKey: ["messages", channelId] });

      // Invalidate thread replies
      queryClient.invalidateQueries({
        queryKey: ["thread-replies", channelId, parentMessageId],
      });

      // Invalidate message
      queryClient.invalidateQueries({ queryKey: ["messageId", messageId] });

      onSuccess?.();
    },
    onError: () => {
      toast.error("Failed to update message");
    },
  });
};
