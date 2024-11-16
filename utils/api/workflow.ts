import { api } from "@/config/api";
import { Result, FlowSchema } from "@/types/apiTypes";

export const createWorkflow = async (workflow: Workflow): Promise<void> => {
  try {
    return await api("/flow", {
      method: "POST",
      body: JSON.stringify(workflow),
    });
  } catch (error) {
    console.error("Error creating workflow", error);
    throw error;
  }
};

export const getWorkflowById = async (id: string): Promise<FlowSchema[]> => {
  try {
    return await api(`/flow/${id}`, {
      method: "GET",
    });
  } catch (error) {
    console.log("Error while getting workflow", error);
  }
  return [{} as FlowSchema];
};

export const getAllWorkflows = async (): Promise<FlowSchema[]> => {
  try {
    return await api("/flow/", {
      method: "GET",
    });
  } catch (error) {
    console.log("Error while getting workflow", error);
  }
  return [{} as FlowSchema];
};

export const getWorkflowsByCreator = async (
  creator_address: string,
): Promise<FlowSchema[]> => {
  try {
    return await api(`/flow/${creator_address}`, {
      method: "GET",
    });
  } catch (error) {
    console.log("Error while getting workflow", error);
  }
  return [{} as FlowSchema];
};

export const updateWorkflow = async (
  id: string,
  workflow: Workflow,
): Promise<void> => {
  try {
    await api(`/flow/${id}`, {
      method: "PATCH",
      body: JSON.stringify(workflow),
    });
  } catch (error) {
    console.error("Error while updating workflow", error);
  }
};

export const deleteWorkflow = async (id: string): Promise<void> => {
  try {
    await api(`/flow/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error while deleting workflow", error);
  }
};
