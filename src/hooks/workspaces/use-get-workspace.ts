import { useQuery } from "@tanstack/react-query";
import { getWorkspaceById } from "@/services/workspaces";
interface UseGetWorkspaceProps {
  id: string;
}

export const useGetWorkspace = ({ id }: UseGetWorkspaceProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["workspaceId", id],
    queryFn: () => getWorkspaceById(id),
    enabled: !!id,
    staleTime: Infinity,
  });

  return { data: data?.data, isLoading };
};
