import { atom, useAtom } from "jotai";
import { useCallback } from "react";

const currentWorkflowAtom = atom<Workflow | undefined>();

export const useCurrentWorkflow = () => {
  const [wf, setWf] = useAtom(currentWorkflowAtom);

  const addBlock = useCallback(
    (id: string) => {
      const blocks = wf?.blocks || [];

      blocks.push({ id });

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
