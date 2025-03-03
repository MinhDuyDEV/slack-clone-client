import { Channel } from "./channel.interface";

export interface Section {
  id: string;
  name: string;
  isDefault: boolean;
  isDirectMessages: boolean;
  order: number;
  userId: string;
  channels: Channel[];
}
