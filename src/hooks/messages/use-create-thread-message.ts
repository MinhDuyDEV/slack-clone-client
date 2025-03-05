import { replyToThread } from "@/services/messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface UseCreateThreadMessageProps {
  channelId: string;
  parentId: string;
  userId: string;
  onSuccess?: () => void;
}

export const useCreateThreadMessage = ({
  channelId,
  parentId,
  userId,
  onSuccess,
}: UseCreateThreadMessageProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: { content: string; imageId?: string }) =>
      replyToThread({
        content: values.content,
        channelId,
        parentId,
        userId,
        imageId: values.imageId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", channelId] });
      queryClient.invalidateQueries({
        queryKey: ["thread-replies", channelId, parentId],
      });

      onSuccess?.();
    },
    onError: () => {
      toast.error("Failed to create thread message");
    },
  });
};
