import { User } from "./user.interface";

export interface Message {
  id: string;
  content: string;
  type: string;
  channelId: string;
  userId: string;
  parentId: string | null;
  isThreadParent: boolean;
  threadMessagesCount: number;
  lastThreadMessageAt: string;
  edited: {
    at: string;
    by: string;
  };
  mentions: [] | null;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface Reaction {}

export interface Attachment {}
