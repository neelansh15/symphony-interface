/* eslint-disable react/jsx-sort-props */
import { PlusIcon } from "lucide-react";

import { Button } from "@nextui-org/button";
import { BlockCard } from "@/components/blocks/BlockCard";
import DefaultLayout from "@/layouts/default";
import "./styles.css";
import { useCurrentWorkflow } from "@/hooks/useCurrentWorkflow";

import { title } from "@/components/primitives";

export default function CreatePage() {
  const { wf, setWf, addBlock } = useCurrentWorkflow();

  return (
    <DefaultLayout>
      <section>
        <h1 className={title({ size: "sm" })}>Create Workflow</h1>

        <div className="workflow-background mt-5 min-h-[60vh] p-6 bg-gray-100 rounded-xl border border-gray-200 flex flex-col items-center">
          {wf &&
            wf.blocks &&
            wf?.blocks.map((block) => (
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
      </section>
    </DefaultLayout>
  );
}
