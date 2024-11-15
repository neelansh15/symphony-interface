import { getBlockById } from "@/utils";
import { atom, useAtom } from "jotai";
import { useCallback } from "react";

const currentWorkflowAtom = atom<Workflow | undefined>({
  name: "Workflow Name",
});

export const useCurrentWorkflow = () => {
  const [wf, setWf] = useAtom(currentWorkflowAtom);

  const addBlock = useCallback(
    (id: string) => {
      const blocks = wf?.blocks || [];

      const block = getBlockById(id);
      blocks.push(block);

      setWf({ ...wf, blocks });
    },
    [wf],
  );

  return {
    wf,
    setWf,
    addBlock,
  };
};
