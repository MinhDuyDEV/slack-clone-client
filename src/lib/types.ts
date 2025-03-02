export type User = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  displayName: string;
  avatar: string | null;
};

export type CreateMessageValues = {
  channelId: string;
  workspaceId: string;
  parentMessageId: string;
  body: string;
  image: string | undefined;
};

export type EditorValue = {
  image: File | null;
  body: string;
};
