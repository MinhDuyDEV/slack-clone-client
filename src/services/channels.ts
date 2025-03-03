import axiosInstance from "@/lib/axiosInstance";

export const getChannels = async (workspaceId: string) => {
  const response = await axiosInstance.get(
    `http://localhost:8000/api/workspaces/${workspaceId}/channels`
  );
  return response.data;
};

export const getChannelById = async (
  workspaceId: string,
  channelId: string
) => {
  const response = await axiosInstance.get(
    `http://localhost:8000/api/workspaces/${workspaceId}/channels/${channelId}`
  );
  console.log("response", response);
  return response.data;
};

export const createChannel = async (
  workspaceId: string,
  body: { name: string; sectionId: string }
) => {
  return await axiosInstance.post(
    `http://localhost:8000/api/workspaces/${workspaceId}/channels`,
    body
  );
};
