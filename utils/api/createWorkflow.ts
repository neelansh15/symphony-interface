import { api } from "@/config/api";

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
