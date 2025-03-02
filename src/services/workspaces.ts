import axiosInstance from "@/lib/axiosInstance";

export const getWorkspaces = async () => {
  const response = await axiosInstance.get(
    "http://localhost:8000/api/workspaces/my"
  );
  return response.data;
};

export const getWorkspaceById = async (id: string) => {
  const response = await axiosInstance.get(
    `http://localhost:8000/api/workspaces/${id}`
  );
  return response.data;
};

export const createWorkspace = async (body: { name: string }) => {
  return await axiosInstance.post("http://localhost:8000/api/workspaces", body);
};
