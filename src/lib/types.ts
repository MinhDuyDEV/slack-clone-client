export type User = {
  id: string;
  email: string;
  username: string;
  fullName: string;
};

export type CreateMessageValues = {
  channelId: string;
  workspaceId: string;
  parentMessageId: string;
  body: string;
  image: string | undefined;
};
