import { blocks } from "@/config/blocks";

export function getBlockById(id: string): Block {
  const block = blocks.find((block) => block.id === id);
  if (!block) {
    throw new Error(`Block with id ${id} not found`);
  }
  return block;
}
