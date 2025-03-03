import { useQuery } from "@tanstack/react-query";
import { getChannels } from "@/services/channels";

interface UseGetChannelsProps {
  workspaceId: string;
}

export const useGetChannels = ({ workspaceId }: UseGetChannelsProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["channels", workspaceId],
    queryFn: () => getChannels(workspaceId),
    enabled: !!workspaceId,
    staleTime: Infinity,
  });

  return { channels: data?.data, isLoading };
};
