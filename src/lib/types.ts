export type User = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  displayName: string;
  avatar: string | null;
};

export type CreateMessageValues = {
  content: string;
  channelId: string;
  parentId?: string;
  userId: string;
  imageId?: string;
};

export type EditorValue = {
  content: string;
  image: File | null | string;
};
