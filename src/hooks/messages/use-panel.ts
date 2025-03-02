import { useQueryState } from "nuqs";

export const usePanel = () => {
  const [parentMessageId, setParentMessageId] =
    useQueryState("parentMessageId");

  const onOpenMessage = (messageId: string) => {
    setParentMessageId(messageId);
  };

  const onCloseMessage = () => {
    setParentMessageId(null);
  };

  return {
    parentMessageId,
    onOpenMessage,
    onCloseMessage,
  };
};
