import { api } from "@/config/api";
import { JobStatusSchema } from "@/types/apiTypes";

export const createJob = async (
  job: JobStatusSchema,
): Promise<JobStatusSchema[]> => {
  try {
    return await api("/job_status/", {
      method: "POST",
      body: JSON.stringify(job),
    });
  } catch (error) {
    console.error("Error creating job", error);
    throw error;
  }
  // return [{} as JobStatusSchema];
};

export const getJobById = async (id: string): Promise<JobStatusSchema[]> => {
  try {
    return await api(`/job_status/${id}`, {
      method: "GET",
    });
  } catch (error) {
    console.error("Error while getting job", error);
  }
  return [{} as JobStatusSchema];
};

export const getJobsByFlowId = async (
  flow_id: string,
): Promise<JobStatusSchema[]> => {
  try {
    return await api(`/job_status/flow/${flow_id}`, {
      method: "GET",
    });
  } catch (error) {
    console.error("Error while getting job", error);
    return [];
  }
};

export const getJobStatusByStatus = async (
  status: string,
): Promise<JobStatusSchema[]> => {
  try {
    return await api(`/job_status/status/${status}`, {
      method: "GET",
    });
  } catch (error) {
    console.error("Error while getting jobs", error);
  }
  return [{} as JobStatusSchema];
};

export const updateJobStatus = async (
  id: string,
  job_status: JobStatusSchema,
): Promise<void> => {
  try {
    await api(`/job_status/${id}`, {
      method: "PATCH",
      body: JSON.stringify(job_status),
    });
  } catch (error) {
    console.error("Error while updating job status", error);
  }
};
