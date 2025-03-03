import { Response } from "@/interfaces/response.interface";
import { Workspace } from "@/interfaces/workspace.interface";
import axiosInstance from "@/lib/axiosInstance";

export const getWorkspaces = async (): Promise<Response<Workspace[]>> => {
  const response = await axiosInstance.get(
    "http://localhost:8000/api/workspaces/my"
  );
  return response.data;
};

export const getWorkspaceById = async (
  id: string
): Promise<Response<Workspace>> => {
  const response = await axiosInstance.get(
    `http://localhost:8000/api/workspaces/${id}`
  );
  return response.data;
};

export const createWorkspace = async (body: {
  name: string;
}): Promise<Response<Workspace>> => {
  const response = await axiosInstance.post(
    "http://localhost:8000/api/workspaces",
    body
  );
  return response.data;
};
