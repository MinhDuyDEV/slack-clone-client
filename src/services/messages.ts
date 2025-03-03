import axiosInstance from "@/lib/axiosInstance";
import { Message } from "@/interfaces/message.interface";
import { Response } from "@/interfaces/response.interface";
import { CreateMessageValues } from "@/lib/types";

export const getMessages = async (
  channelId: string
): Promise<Response<Message[]>> => {
  const response = await axiosInstance.get(
    `http://localhost:8000/api/channels/${channelId}/messages`
  );
  return response.data;
};

export const getMessage = async (
  channelId: string,
  messageId: string
): Promise<Response<Message>> => {
  const response = await axiosInstance.get(
    `http://localhost:8000/api/channels/${channelId}/messages/${messageId}`
  );
  return response.data;
};

export const createMessage = async (
  values: CreateMessageValues
): Promise<Response<Message>> => {
  const response = await axiosInstance.post(
    `http://localhost:8000/api/channels/${values.channelId}/messages`,
    values
  );
  return response.data;
};
