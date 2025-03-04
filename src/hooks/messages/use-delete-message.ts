import { deleteMessage } from "@/services/messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteMessage = ({
  channelId,
  parentMessageId,
}: {
  channelId: string;
  parentMessageId: string | null;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId: string) => deleteMessage(channelId, messageId),
    onSuccess: () => {
      // Invalidate channel messages
      queryClient.invalidateQueries({ queryKey: ["messages", channelId] });

      // Invalidate thread replies
      queryClient.invalidateQueries({
        queryKey: ["thread-replies", channelId, parentMessageId],
      });
    },
  });
};
