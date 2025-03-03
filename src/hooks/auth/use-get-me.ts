import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/auth";
import { User } from "@/interfaces/user.interface";

export const useGetMe = () => {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["me"],
    queryFn: getProfile,
    staleTime: Infinity,
  });

  return { me: data?.data, isLoadingMe: isLoading };
};
