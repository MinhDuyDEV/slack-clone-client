// Fake seed data for the application
// This file contains mock data for development and testing purposes

// Type definition for workspace
export type Workspace = {
  id: string;
  name: string;
  joinCode: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  imageUrl?: string;
};

// Mock workspaces data
export const workspaces: Workspace[] = [
  {
    id: "workspace-1",
    name: "Acme Corp",
    joinCode: "ACME123",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-06-20"),
    ownerId: "user-1",
    imageUrl: "/images/workspace-1.png",
  },
  {
    id: "workspace-2",
    name: "Tech Innovators",
    joinCode: "TECH456",
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-07-05"),
    ownerId: "user-1",
  },
  {
    id: "workspace-3",
    name: "Design Team",
    joinCode: "DESIGN789",
    createdAt: new Date("2023-05-22"),
    updatedAt: new Date("2023-08-15"),
    ownerId: "user-2",
  },
];

// Type definition for user
export type User = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  imageUrl?: string;
};

// Mock users data
export const users: User[] = [
  {
    id: "user-1",
    email: "john@example.com",
    username: "johndoe",
    fullName: "John Doe",
    imageUrl: "/images/avatars/john.png",
  },
  {
    id: "user-2",
    email: "jane@example.com",
    username: "janedoe",
    fullName: "Jane Doe",
    imageUrl: "/images/avatars/jane.png",
  },
  {
    id: "user-3",
    email: "bob@example.com",
    username: "bobsmith",
    fullName: "Bob Smith",
  },
];

// Type definition for channel
export type Channel = {
  id: string;
  name: string;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  isPrivate: boolean;
  description?: string;
};

// Mock channels data
export const channels: Channel[] = [
  {
    id: "channel-1",
    name: "general",
    workspaceId: "workspace-1",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15"),
    creatorId: "user-1",
    isPrivate: false,
    description: "General discussions for everyone",
  },
  {
    id: "channel-2",
    name: "random",
    workspaceId: "workspace-1",
    createdAt: new Date("2023-01-16"),
    updatedAt: new Date("2023-01-16"),
    creatorId: "user-1",
    isPrivate: false,
    description: "Random topics and fun stuff",
  },
  {
    id: "channel-3",
    name: "project-alpha",
    workspaceId: "workspace-1",
    createdAt: new Date("2023-02-05"),
    updatedAt: new Date("2023-05-10"),
    creatorId: "user-2",
    isPrivate: true,
    description: "Private channel for Project Alpha",
  },
  {
    id: "channel-4",
    name: "general",
    workspaceId: "workspace-2",
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-03-10"),
    creatorId: "user-1",
    isPrivate: false,
  },
];

// Type definition for workspace member
export type Member = {
  id: string;
  userId: string;
  workspaceId: string;
  role: "ADMIN" | "MEMBER";
  createdAt: Date;
};

// Mock members data
export const members: Member[] = [
  {
    id: "member-1",
    userId: "user-1",
    workspaceId: "workspace-1",
    role: "ADMIN",
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "member-2",
    userId: "user-2",
    workspaceId: "workspace-1",
    role: "MEMBER",
    createdAt: new Date("2023-01-20"),
  },
  {
    id: "member-3",
    userId: "user-3",
    workspaceId: "workspace-1",
    role: "MEMBER",
    createdAt: new Date("2023-02-05"),
  },
  {
    id: "member-4",
    userId: "user-1",
    workspaceId: "workspace-2",
    role: "ADMIN",
    createdAt: new Date("2023-03-10"),
  },
  {
    id: "member-5",
    userId: "user-2",
    workspaceId: "workspace-3",
    role: "ADMIN",
    createdAt: new Date("2023-05-22"),
  },
];

// Type definition for reaction
export type Reaction = {
  id: string;
  messageId: string;
  memberId: string;
  value: string; // emoji value
  createdAt: Date;
};

// Mock reactions data
export const reactions: Reaction[] = [
  {
    id: "reaction-1",
    messageId: "message-1",
    memberId: "member-2",
    value: "👍",
    createdAt: new Date("2023-01-15T10:32:00"),
  },
  {
    id: "reaction-2",
    messageId: "message-1",
    memberId: "member-3",
    value: "👍",
    createdAt: new Date("2023-01-15T10:33:00"),
  },
  {
    id: "reaction-3",
    messageId: "message-1",
    memberId: "member-1",
    value: "❤️",
    createdAt: new Date("2023-01-15T10:34:00"),
  },
  {
    id: "reaction-4",
    messageId: "message-2",
    memberId: "member-1",
    value: "👏",
    createdAt: new Date("2023-01-15T10:36:00"),
  },
  {
    id: "reaction-5",
    messageId: "message-3",
    memberId: "member-1",
    value: "🚀",
    createdAt: new Date("2023-02-05T14:22:00"),
  },
  {
    id: "reaction-6",
    messageId: "message-3",
    memberId: "member-2",
    value: "🚀",
    createdAt: new Date("2023-02-05T14:23:00"),
  },
];

// Helper function to get reactions for a specific message
export const getReactionsForMessage = (messageId: string) => {
  // Group reactions by value
  const reactionsByValue: Record<
    string,
    { memberIds: string[]; count: number }
  > = {};

  reactions
    .filter((reaction) => reaction.messageId === messageId)
    .forEach((reaction) => {
      if (!reactionsByValue[reaction.value]) {
        reactionsByValue[reaction.value] = {
          memberIds: [],
          count: 0,
        };
      }
      reactionsByValue[reaction.value].memberIds.push(reaction.memberId);
      reactionsByValue[reaction.value].count += 1;
    });

  // Convert to array format needed by the component
  return Object.entries(reactionsByValue).map(([value, data], index) => ({
    _id: `grouped-reaction-${messageId}-${index}`,
    value,
    count: data.count,
    memberIds: data.memberIds,
  }));
};

// Helper function to get current user's workspaces
export const getCurrentUserWorkspaces = (userId: string) => {
  const userMemberships = members.filter((member) => member.userId === userId);
  return workspaces.filter((workspace) =>
    userMemberships.some((member) => member.workspaceId === workspace.id)
  );
};

// Helper function to check if user is admin of a workspace
export const isWorkspaceAdmin = (userId: string, workspaceId: string) => {
  const membership = members.find(
    (member) => member.userId === userId && member.workspaceId === workspaceId
  );
  return membership?.role === "ADMIN";
};

// Helper function to get workspace channels
export const getWorkspaceChannels = (workspaceId: string) => {
  return channels.filter((channel) => channel.workspaceId === workspaceId);
};

// ---Messages---
// Type definition for message
export type Message = {
  id: string;
  body: string;
  channelId: string;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
  senderId: string; // userId of the sender
  parentMessageId?: string;
  imageUrl?: string;
};

// Mock messages data
export const messages: Message[] = [
  // Tin nhắn trong kênh general của workspace 1
  {
    id: "message-1",
    body: "Hello everyone! Welcome to the general channel.",
    channelId: "channel-1",
    workspaceId: "workspace-1",
    createdAt: new Date("2023-01-15T10:30:00"),
    updatedAt: new Date("2023-01-15T10:30:00"),
    senderId: "user-1",
  },
  {
    id: "message-2",
    body: "Thanks for the welcome! Excited to be here.",
    channelId: "channel-1",
    workspaceId: "workspace-1",
    createdAt: new Date("2023-01-15T10:35:00"),
    updatedAt: new Date("2023-01-15T10:35:00"),
    senderId: "user-2",
  },
  {
    id: "message-3",
    body: "Let's discuss the new project requirements.",
    channelId: "channel-1",
    workspaceId: "workspace-1",
    createdAt: new Date("2023-01-15T11:20:00"),
    updatedAt: new Date("2023-01-15T11:20:00"),
    senderId: "user-1",
  },
  {
    id: "message-4",
    body: "I think we should focus on the UI first.",
    channelId: "channel-1",
    workspaceId: "workspace-1",
    createdAt: new Date("2023-01-15T11:22:00"),
    updatedAt: new Date("2023-01-15T11:22:00"),
    senderId: "user-1",
  },
  {
    id: "message-5",
    body: "Agreed. The backend can wait a bit.",
    channelId: "channel-1",
    workspaceId: "workspace-1",
    createdAt: new Date("2023-01-15T11:25:00"),
    updatedAt: new Date("2023-01-15T11:25:00"),
    senderId: "user-2",
  },

  // Tin nhắn trong kênh random của workspace 1
  {
    id: "message-6",
    body: "Just sharing some random thoughts here.",
    channelId: "channel-2",
    workspaceId: "workspace-1",
    createdAt: new Date("2023-01-16T09:15:00"),
    updatedAt: new Date("2023-01-16T09:15:00"),
    senderId: "user-3",
  },
  {
    id: "message-7",
    body: "Did anyone watch the game last night?",
    channelId: "channel-2",
    workspaceId: "workspace-1",
    createdAt: new Date("2023-01-16T09:30:00"),
    updatedAt: new Date("2023-01-16T09:30:00"),
    senderId: "user-2",
  },
  {
    id: "message-8",
    body: "Yes! It was amazing!",
    channelId: "channel-2",
    workspaceId: "workspace-1",
    createdAt: new Date("2023-01-16T09:32:00"),
    updatedAt: new Date("2023-01-16T09:32:00"),
    senderId: "user-1",
  },

  // Tin nhắn trong kênh project-alpha của workspace 1
  {
    id: "message-9",
    body: "Here's the latest design mockup for Project Alpha.",
    channelId: "channel-3",
    workspaceId: "workspace-1",
    createdAt: new Date("2023-02-05T14:20:00"),
    updatedAt: new Date("2023-02-05T14:20:00"),
    senderId: "user-2",
    imageUrl: "https://placehold.co/600x400?text=Design+Mockup",
  },
  {
    id: "message-10",
    body: "Looks great! I have a few suggestions though.",
    channelId: "channel-3",
    workspaceId: "workspace-1",
    createdAt: new Date("2023-02-05T14:25:00"),
    updatedAt: new Date("2023-02-05T14:25:00"),
    senderId: "user-1",
  },

  // Tin nhắn trong thread của message-9
  {
    id: "message-11",
    body: "What specifically would you like to change?",
    channelId: "channel-3",
    workspaceId: "workspace-1",
    createdAt: new Date("2023-02-05T14:27:00"),
    updatedAt: new Date("2023-02-05T14:27:00"),
    senderId: "user-2",
    parentMessageId: "message-9",
  },
  {
    id: "message-12",
    body: "I think the color scheme could be more consistent with our brand.",
    channelId: "channel-3",
    workspaceId: "workspace-1",
    createdAt: new Date("2023-02-05T14:30:00"),
    updatedAt: new Date("2023-02-05T14:30:00"),
    senderId: "user-1",
    parentMessageId: "message-9",
  },
  {
    id: "message-13",
    body: "And maybe we could simplify the navigation a bit.",
    channelId: "channel-3",
    workspaceId: "workspace-1",
    createdAt: new Date("2023-02-05T14:31:00"),
    updatedAt: new Date("2023-02-05T14:31:00"),
    senderId: "user-1",
    parentMessageId: "message-9",
  },
  {
    id: "message-14",
    body: "Good points. I'll work on a revised version.",
    channelId: "channel-3",
    workspaceId: "workspace-1",
    createdAt: new Date("2023-02-05T14:35:00"),
    updatedAt: new Date("2023-02-05T14:35:00"),
    senderId: "user-2",
    parentMessageId: "message-9",
  },

  // Tin nhắn trong kênh general của workspace 2
  {
    id: "message-15",
    body: "Hello Tech Innovators team!",
    channelId: "channel-4",
    workspaceId: "workspace-2",
    createdAt: new Date("2023-03-10T10:00:00"),
    updatedAt: new Date("2023-03-10T10:00:00"),
    senderId: "user-1",
  },
  {
    id: "message-16",
    body: "Let's use this workspace to collaborate on our tech projects.",
    channelId: "channel-4",
    workspaceId: "workspace-2",
    createdAt: new Date("2023-03-10T10:02:00"),
    updatedAt: new Date("2023-03-10T10:02:00"),
    senderId: "user-1",
  },

  // Thêm tin nhắn cho ngày hiện tại
  {
    id: "message-17",
    body: "Good morning everyone!",
    channelId: "channel-1",
    workspaceId: "workspace-1",
    createdAt: new Date(new Date().setHours(9, 0, 0, 0)),
    updatedAt: new Date(new Date().setHours(9, 0, 0, 0)),
    senderId: "user-1",
  },
  {
    id: "message-18",
    body: "What's on the agenda for today?",
    channelId: "channel-1",
    workspaceId: "workspace-1",
    createdAt: new Date(new Date().setHours(9, 5, 0, 0)),
    updatedAt: new Date(new Date().setHours(9, 5, 0, 0)),
    senderId: "user-2",
  },
  {
    id: "message-19",
    body: "We need to finalize the Q2 roadmap.",
    channelId: "channel-1",
    workspaceId: "workspace-1",
    createdAt: new Date(new Date().setHours(9, 10, 0, 0)),
    updatedAt: new Date(new Date().setHours(9, 10, 0, 0)),
    senderId: "user-1",
  },
  {
    id: "message-20",
    body: "And review the latest user feedback.",
    channelId: "channel-1",
    workspaceId: "workspace-1",
    createdAt: new Date(new Date().setHours(9, 11, 0, 0)),
    updatedAt: new Date(new Date().setHours(9, 11, 0, 0)),
    senderId: "user-1",
  },
];

// Helper functions để lấy thông tin thread
export function getThreadCount(messageId: string): number {
  return messages.filter((m) => m.parentMessageId === messageId).length;
}

export function getThreadImage(messageId: string): string | undefined {
  const threadMessages = messages.filter(
    (m) => m.parentMessageId === messageId
  );
  if (threadMessages.length === 0) return undefined;

  const lastMessage = threadMessages[threadMessages.length - 1];
  const sender = users.find((u) => u.id === lastMessage.senderId);
  return sender?.imageUrl;
}

export function getThreadName(messageId: string): string | undefined {
  const threadMessages = messages.filter(
    (m) => m.parentMessageId === messageId
  );
  if (threadMessages.length === 0) return undefined;

  const lastMessage = threadMessages[threadMessages.length - 1];
  const sender = users.find((u) => u.id === lastMessage.senderId);
  return sender?.fullName;
}
