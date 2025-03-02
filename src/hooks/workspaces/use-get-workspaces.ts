import { getWorkspaces } from "@/services/workspaces";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaces = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
    staleTime: Infinity,
  });

  return { workspaces: data?.data, isLoading };
};
