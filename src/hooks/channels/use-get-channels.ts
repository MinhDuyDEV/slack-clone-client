import { useQuery } from "@tanstack/react-query";

interface UseGetChannelsProps {
  workspaceId: string;
}

export const useGetChannels = ({ workspaceId }: UseGetChannelsProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["channels", workspaceId],
    // queryFn: () => getChannels(workspaceId),
  });

  return { data, isLoading };
};
