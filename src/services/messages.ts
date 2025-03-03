import axiosInstance from "@/lib/axiosInstance";
import { Message } from "@/interfaces/message.interface";
import { Response } from "@/interfaces/response.interface";

export const getMessages = async (
  channelId: string
): Promise<Response<Message[]>> => {
  const response = await axiosInstance.get(
    `http://localhost:8000/api/channels/${channelId}/messages`
  );
  return response.data;
};
