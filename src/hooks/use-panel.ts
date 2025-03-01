import { useQueryState } from "nuqs";

export const useThreadPanel = () => {
  const [threadMessageId, setThreadMessageId] =
    useQueryState("parentMessageId");

  const showThreadForMessage = (messageId: string) => {
    setThreadMessageId(messageId);
  };

  const hideThreadPanel = () => {
    setThreadMessageId(null);
  };

  return {
    threadMessageId,
    showThreadForMessage,
    hideThreadPanel,
  };
};
