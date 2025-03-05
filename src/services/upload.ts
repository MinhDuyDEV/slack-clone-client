import axiosInstance from "@/lib/axiosInstance";

export type UploadFileBody = {
  files: File[];
};

export type UploadFileResponse = {
  id: string;
  name: string;
  url: string;
  mimetype: string;
}[];

export const uploadMultipleFiles = async (
  body: UploadFileBody
): Promise<UploadFileResponse> => {
  const formData = new FormData();
  body.files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await axiosInstance.post("/api/files/multiple", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
