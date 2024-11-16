import { BlockSchema } from "@/types/apiTypes";
import { getAllBlocks } from "@/utils/api/block";
import { useQuery } from "@tanstack/react-query";

export const useBlocks = () => {
  return useQuery<BlockSchema[]>({
    queryKey: ["all-blocks"],
    queryFn: getAllBlocks,
    refetchInterval: 10000,
  });
};
