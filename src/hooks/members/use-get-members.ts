import { useQuery } from "@tanstack/react-query";

interface UseGetMembersProps {
  workspaceId: string;
}

export const useGetMembers = ({ workspaceId }: UseGetMembersProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["members", workspaceId],
    // queryFn: () => getMembers(workspaceId),
  });

  return { data, isLoading };
};
