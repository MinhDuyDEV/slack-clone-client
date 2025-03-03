import { useQuery } from "@tanstack/react-query";
import { getChannelById } from "@/services/channels";

export const useGetChannel = (workspaceId: string, channelId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["channel", channelId],
    queryFn: () => getChannelById(workspaceId, channelId),
    enabled: !!channelId,
    staleTime: Infinity,
  });
  console.log("data", data);

  return { channel: data, isLoading };
};
