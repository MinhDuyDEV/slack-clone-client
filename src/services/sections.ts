import axiosInstance from "@/lib/axiosInstance";

export const createSection = async (
  workspaceId: string,
  body: { name: string }
) => {
  const response = await axiosInstance.post(
    `/api/workspaces/${workspaceId}/sections`,
    body
  );
  return response.data;
};
