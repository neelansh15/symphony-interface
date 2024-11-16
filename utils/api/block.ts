import { api } from "@/config/api";
import { BlockSchema } from "@/types/apiTypes";

export const createBlock = async (
  block: BlockSchema,
): Promise<BlockSchema[]> => {
  try {
    return await api("/block", {
      method: "POST",
      body: JSON.stringify(block),
    });
  } catch (error) {
    console.error("Error creating block", error);
    throw new Error("Error creating block");
  }
};

export const getBlockById = async (id: string): Promise<BlockSchema[]> => {
  try {
    return await api(`/block/${id}`, {
      method: "GET",
    });
  } catch (error) {
    console.log("Error while getting block", error);
  }
  return [{} as BlockSchema];
};

export const getAllBlocks = async (): Promise<BlockSchema[]> => {
  try {
    return await api("/block/", {
      method: "GET",
    });
  } catch (error) {
    console.log("Error while getting blocks", error);
  }
  return [{} as BlockSchema];
};

export const getBlocksByCreator = async (
  creator_address: string,
): Promise<BlockSchema[]> => {
  try {
    return await api(`/block/${creator_address}`, {
      method: "GET",
    });
  } catch (error) {
    console.log("Error while getting blocks", error);
  }
  return [{} as BlockSchema];
};
