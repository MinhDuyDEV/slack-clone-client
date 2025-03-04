import { useQuery } from "@tanstack/react-query";
import { getThreadReplies } from "@/services/messages";

interface UseGetThreadRepliesProps {
  channelId: string;
  messageId: string;
}

export const useGetThreadReplies = ({
  channelId,
  messageId,
}: UseGetThreadRepliesProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["thread-replies", channelId, messageId],
    queryFn: () => getThreadReplies(channelId, messageId),
    enabled: !!messageId,
    staleTime: Infinity,
  });

  return { data, isLoading };
};
