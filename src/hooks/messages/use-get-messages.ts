import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/services/messages";

interface UseGetMessagesProps {
  channelId: string;
}

export const useGetMessages = ({ channelId }: UseGetMessagesProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["messages", channelId],
    queryFn: () => getMessages(channelId),
    enabled: !!channelId,
    staleTime: Infinity,
  });

  console.log("useGetMessages data:", data);

  return { messages: data?.data || [], isLoading };
};
