import { useParams } from "next/navigation";

/**
 * useChannelId - Custom hook to get the current channel ID from URL
 * @returns The current channel ID from URL parameters
 */
export const useChannelId = () => {
  const params = useParams<{ channelId: string }>();
  return params.channelId;
};
