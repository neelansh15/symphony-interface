import { getBlockById } from "@/utils";
import { atom, useAtom } from "jotai";
import { useCallback } from "react";

const currentWorkflowAtom = atom<Workflow | undefined>({
  name: "Workflow Name",
});

export const useCurrentWorkflow = () => {
  const [wf, setWf] = useAtom(currentWorkflowAtom);

  return {
    wf,
    setWf,
  };
};
