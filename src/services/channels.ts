import { Channel } from "@/interfaces/channel.interface";
import { Response } from "@/interfaces/response.interface";
import axiosInstance from "@/lib/axiosInstance";

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
  body: { name: string; sectionId: string }
): Promise<Response<Channel>> => {
  const response = await axiosInstance.post(
    `http://localhost:8000/api/workspaces/${workspaceId}/channels`,
    body
  );
  return response.data;
};
