export interface Channel {
  id: string;
  name: string;
  description: string;
  type: string;
  isPrivate: boolean;
  isDefault: boolean;
  sectionId: string;
  createdAt: string;
  updatedAt: string;
  workspaceId: string;
  userId: string;
}
