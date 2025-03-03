import { useQuery } from "@tanstack/react-query";
import { getChannelById } from "@/services/channels";

export const useGetChannel = (workspaceId: string, channelId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["channel", channelId],
    queryFn: () => getChannelById(workspaceId, channelId),
    enabled: !!channelId,
    staleTime: Infinity,
  });

  return { channel: data?.data, isLoading };
};
