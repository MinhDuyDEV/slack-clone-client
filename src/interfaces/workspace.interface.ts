import { Section } from "./section.interface";

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  ownerId: string;
  settings: Settings;
  createdAt: string;
  updatedAt: string;
  sections: Section[];
  defaultSectionId: string;
}

export interface Settings {
  allowInvites: boolean;
  defaultChannelId: string;
  defaultSectionId: string;
  allowDirectMessages: boolean;
  allowPublicChannels: boolean;
  ownerDirectMessageSectionId: string;
}
