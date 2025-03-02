import { useParams } from "next/navigation";

export const useMemberId = () => {
  const params = useParams<{ memberId: string }>();
  return params.memberId;
};
