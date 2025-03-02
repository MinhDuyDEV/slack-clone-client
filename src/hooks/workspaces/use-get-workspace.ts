import { useQuery } from "@tanstack/react-query";
import { getWorkspaceById } from "@/services/workspaces";
interface UseGetWorkspaceProps {
  id: string;
}

export const useGetWorkspace = ({ id }: UseGetWorkspaceProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["workspaces", id],
    queryFn: () => getWorkspaceById(id),
  });

  return { data: data?.data, isLoading };
};
