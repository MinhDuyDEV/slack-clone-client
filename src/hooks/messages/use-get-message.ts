import { useQuery } from "@tanstack/react-query";
import { getMessage } from "@/services/messages";

export const useGetMessage = (channelId: string, messageId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["messageId", messageId],
    queryFn: () => getMessage(channelId, messageId),
    enabled: !!messageId,
    staleTime: Infinity,
  });

  return { message: data?.data, isLoading };
};
