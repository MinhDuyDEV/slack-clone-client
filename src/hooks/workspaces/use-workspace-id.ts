import { useParams } from "next/navigation";

/**
 * useWorkspaceId - Custom hook to get the current workspace ID from URL
 * @returns The current workspace ID from URL parameters
 */
export const useWorkspaceId = () => {
  const params = useParams<{ workspaceId: string }>();
  return params.workspaceId;
};
