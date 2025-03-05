import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage } from "@/services/messages";
import { CreateMessageValues } from "@/lib/types";
import toast from "react-hot-toast";

interface UseCreateMessageProps {
  channelId: string;
  userId: string;
  onSuccess?: () => void;
}

export const useCreateMessage = ({
  channelId,
  onSuccess,
  userId,
}: UseCreateMessageProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: { content: string; imageId: string }) =>
      createMessage({
        content: values.content,
        channelId,
        userId,
        imageId: values.imageId,
      }),
    onSuccess: () => {
      // Invalidate channel messages
      queryClient.invalidateQueries({ queryKey: ["messages", channelId] });

      onSuccess?.();
    },
    onError: () => {
      toast.error("Failed to create message");
    },
  });
};
