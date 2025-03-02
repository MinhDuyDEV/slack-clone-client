import { useQuery } from "@tanstack/react-query";

interface UseCurrentMemberProps {
  workspaceId: string;
}

export const useCurrentMember = ({ workspaceId }: UseCurrentMemberProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["members", workspaceId],
    // queryFn: () => getCurrentMember(workspaceId),
  });

  return { data, isLoading };
};
