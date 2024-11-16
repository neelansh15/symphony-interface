import { blocks } from "@/config/blocks";
import { getBlockById as getById } from "@/utils/api/block";
import memoize from "lodash/memoize";

export const getBlockById = memoize(async (id: string): Promise<Block> => {
  // const block = blocks.find((block) => block.id === id);
  // if (!block) {
  //   throw new Error(`Block with id ${id} not found`);
  // }
  // return block;

  const block = (await getById(id))[0];
  console.log("Got block for id ", id, block);
  const formattedBlock: Block = {
    id,
    blockId: block.name,
    name: block.name,
    description: block.description,
    params: block.params.input,
    input: block.params.input,
    output: block.params.output,
    // output: block.params,
  };
  return formattedBlock;
});

export function firstLetterToUpperCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
