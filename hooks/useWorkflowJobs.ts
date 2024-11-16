import { JobStatusSchema } from "@/types/apiTypes";
import { getJobsByFlowId } from "@/utils/api/jobStatus";
import { useQuery } from "@tanstack/react-query";

export const useWorkflowJobs = (flow_id: string) => {
  return useQuery<JobStatusSchema[]>({
    queryKey: ["workflow-jobs", flow_id],
    queryFn: () => getJobsByFlowId(flow_id),
    refetchInterval: 10000,
  });
};

export const useMultipleWorkflowJobs = (flow_ids: string[]) => {
  return useQuery<JobStatusSchema[][]>({
    queryKey: ["multiple-workflow-jobs", flow_ids],
    queryFn: () => {
      return Promise.all(flow_ids.map((flow_id) => getJobsByFlowId(flow_id)));
    },
    refetchInterval: 5000,
    enabled: flow_ids && flow_ids.length > 0,
  });
};
