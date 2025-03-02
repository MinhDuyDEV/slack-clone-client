import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/auth";

export const useGetMe = () => {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["me"],
    queryFn: getProfile,
    staleTime: Infinity,
  });

  return { me: data?.data, isLoadingMe: isLoading };
};
