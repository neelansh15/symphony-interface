/* eslint-disable react/jsx-sort-props */
import { PlusIcon } from "lucide-react";

import { Button } from "@nextui-org/button";
import { BlockCard } from "@/components/blocks/BlockCard";
import DefaultLayout from "@/layouts/default";
import "./styles.css";
import { useCurrentWorkflow } from "@/hooks/useCurrentWorkflow";

import { title } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import { useCallback } from "react";

export default function CreatePage() {
  const { wf, setWf, addBlock } = useCurrentWorkflow();

  const handleNameChange = useCallback(
    (value: string) => {
      setWf((currentVal) => ({ ...currentVal, name: value }));
    },
    [setWf],
  );

  const handleCreate = useCallback(() => {
    console.log("Creating workflow", wf);
  }, [wf]);

  return (
    <DefaultLayout>
      <section>
        <h1 className="text-secondary uppercase font-semibold text-sm">Workflow</h1>

        <div className="mt-6">
          <Input
            type="text"
            variant="underlined"
            onChange={(e) => handleNameChange(e.target.value)}
            value={wf?.name}
            classNames={{
              inputWrapper: "max-w-max",
              input: "text-4xl font-bold",
            }}
          />
        </div>

        <div className="workflow-background mt-5 min-h-[60vh] p-6 bg-gray-100 rounded-xl border border-gray-200 flex flex-col items-center">
          {wf &&
            wf.blocks &&
            wf.blocks.map((block) => (
              <>
                <BlockCard id={block.id} className="mt-5" />
              </>
            ))}

          <Button
            className="mt-3 max-w-xl"
            fullWidth
            onClick={() => addBlock(Math.random().toString())}
          >
            <PlusIcon width={18} />
            Add Block
          </Button>
        </div>

        <div className="mt-5">
          <Button color="primary" onClick={handleCreate}>Create</Button>
        </div>
      </section>
    </DefaultLayout>
  );
}
