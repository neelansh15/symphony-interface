import { getWorkflows } from "@/utils/api/workflows";
import { useQuery } from "@tanstack/react-query";

export const useWorkflows = () => {
  return useQuery<Workflow[]>({
    queryKey: ["all-workflows"],
    queryFn: getWorkflows,
    refetchInterval: 10000,
  });
};
