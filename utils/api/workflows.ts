import { api } from "@/config/api";

export const getWorkflows = async (): Promise<Workflow[]> => {
  try {
    const response = await api("/flow");
    return response;
  } catch (error) {
    console.error("Error fetching workflows", error);
    return [];
  }
};

export const getWorkflowByCreator = async (address: string): Promise<Workflow[]> => {
  try {
    const response = await api(`/flow/creator/${address}`);
    return response;
  } catch (error) {
    console.error("Error fetching workflows", error);
    return [];
  }
}

export const createWorkflow = async (workflow: Workflow): Promise<void> => {
  try {
    await api("/flow", {
      method: "POST",
      body: JSON.stringify(workflow),
    });
  } catch (error) {
    console.error("Error creating workflow", error);
  }
};
