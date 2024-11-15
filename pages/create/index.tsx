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
import { useDisclosure } from "@nextui-org/modal";
import { Card, CardBody } from "@nextui-org/card";

export default function CreatePage() {
  const { wf, setWf, addBlock } = useCurrentWorkflow();

  const { isOpen, onOpen } = useDisclosure();

  const handleNameChange = useCallback(
    (value: string) => {
      setWf((currentVal) => ({ ...currentVal, name: value }));
    },
    [setWf],
  );

  const handleCreate = useCallback(() => {
    console.log("Creating workflow", wf);
  }, [wf]);

  const handleAddBlock = useCallback(() => {
    addBlock("create-token");
  }, [addBlock]);

  const handleRemoveBlock = useCallback(
    (index: number) => () => {
      setWf((currentVal) => {
        const blocks = currentVal?.blocks ? [...currentVal.blocks] : [];
        blocks.splice(index, 1);

        return {
          ...currentVal,
          blocks,
        };
      });
    },
    [setWf],
  );

  return (
    <DefaultLayout>
      <section>
        <h1 className="text-secondary uppercase font-semibold text-sm">
          Workflow
        </h1>

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

        <div className="workflow-background mt-5 min-h-[60vh] p-6 rounded-xl border border-gray-200 dark:border-content4 flex flex-col items-center bg-gray-100 dark:bg-content1">
          {(!wf || !wf.blocks || wf?.blocks?.length === 0) && (
            <Card
              className="text-gray-500 max-w-xl min-h-24 text-sm md:text-base"
              fullWidth
            >
              <CardBody className="flex justify-center items-center ">
                No blocks added yet. Start by adding one below.
              </CardBody>
            </Card>
          )}

          {wf?.blocks?.map((block, i) => (
            <BlockCard
              key={block.id + i}
              blockId={block.id}
              className="mt-5"
              onDismiss={handleRemoveBlock(i)}
            />
          ))}

          <Button className="mt-5 max-w-xl" fullWidth onClick={handleAddBlock}>
            <PlusIcon width={18} />
            Add Block
          </Button>
        </div>

        <div className="mt-5">
          <Button color="primary" onClick={handleCreate}>
            Create
          </Button>
        </div>
      </section>
    </DefaultLayout>
  );
}
