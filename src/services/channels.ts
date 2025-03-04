import { Channel } from "@/interfaces/channel.interface";
import { Response } from "@/interfaces/response.interface";
import axiosInstance from "@/lib/axiosInstance";
import { ChannelType } from "@/lib/enum";

export const getChannels = async (
  workspaceId: string
): Promise<Response<Channel[]>> => {
  const response = await axiosInstance.get(
    `http://localhost:8000/api/workspaces/${workspaceId}/channels`
  );
  return response.data;
};

export const getChannelById = async (
  workspaceId: string,
  channelId: string
): Promise<Response<Channel>> => {
  const response = await axiosInstance.get(
    `http://localhost:8000/api/workspaces/${workspaceId}/channels/${channelId}`
  );
  return response.data;
};

export const createChannel = async (
  workspaceId: string,
  body: { name: string; sectionId: string; type: ChannelType }
): Promise<Response<Channel>> => {
  const response = await axiosInstance.post(
    `http://localhost:8000/api/workspaces/${workspaceId}/channels`,
    body
  );
  return response.data;
};

export const addChannelMember = async (
  workspaceId: string,
  channelId: string,
  body: { email: string }
) => {
  const response = await axiosInstance.post(
    `http://localhost:8000/api/workspaces/${workspaceId}/channels/${channelId}/members`,
    body
  );
  return response.data;
};
