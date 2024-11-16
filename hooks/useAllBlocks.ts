import { getAllBlocks } from "@/utils/api/block";
import { useQuery } from "@tanstack/react-query";

export const useAllBlocks = () => {
  return useQuery({
    queryKey: ["all-blocks"],
    queryFn: getAllBlocks,
  });
};
