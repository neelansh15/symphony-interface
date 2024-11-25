import { ArrowDownIcon, PlusIcon } from "lucide-react";

import { Button } from "@nextui-org/button";
import { BlockCard } from "@/components/blocks/BlockCard";
import DefaultLayout from "@/layouts/default";
import { useCurrentWorkflow } from "@/hooks/useCurrentWorkflow";

import { Input } from "@nextui-org/input";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDisclosure } from "@nextui-org/modal";
import { Card, CardBody } from "@nextui-org/card";
import { AddBlockModal } from "@/components/blocks/AddBlockModal";
import { EditBlockModal } from "@/components/blocks/EditBlockModal";
import autoAnimate from "@formkit/auto-animate";
import { v4 as uuidv4 } from "uuid";
import { getBlockById } from "@/utils";
import { createWorkflow } from "@/utils/api/workflow";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { useRouter } from "next/router";
import { Checkbox } from "@nextui-org/checkbox";

export default function CreatePage() {
  const parent = useRef(null);
  const recurringInputParent = useRef(null);

  const router = useRouter();

  const { wf, setWf } = useCurrentWorkflow();

  const [isRecurring, setRecurring] = useState(false);
  const [recurringInterval, setRecurringInterval] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();

  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

  const { theme } = useTheme();

  const handleNameChange = useCallback(
    (value: string) => {
      // @ts-ignore
      setWf((currentVal) => ({ ...currentVal, name: value }));
    },
    [setWf],
  );

  const handleAddBlock = useCallback(
    async (blockId: string) => {
      const baseBlock = await getBlockById(blockId);
      // @ts-ignore
      setWf((currentVal) => {
        const blocks = currentVal?.blocks ? [...currentVal.blocks] : [];

        const id = uuidv4();

        const newBlock = {
          ...baseBlock,
          id: Number(baseBlock.id) + "_" + id,
        };

        blocks.push(newBlock);

        setSelectedBlock(newBlock);

        return {
          ...currentVal,
          blocks,
        };
      });
    },
    [setWf],
  );

  const handleRemoveBlock = useCallback(
    (index: number) => () => {
      // @ts-ignore
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

  const handleCreate = useCallback(async () => {
    if (!wf) return;
    try {
      const workflow = {
        ...wf,
        block_sequence: wf.blocks?.map((b) => b.id.toString().split("_")[0]),
        block_params: wf.blocks
          ? wf.blocks.map((block) => {
              const params: Record<string, any> = {};
              block.params?.forEach((param) => {
                params[param.name || ""] = param.value;
              });
              return params;
            })
          : [],

        ...(isRecurring && {
          trigger_type: "time",

          // Convert recurringInterval from minutes to milliseconds
          trigger_condition: Number(recurringInterval) * 60 * 1000,
        }),
      };

      console.log("Creating workflow", workflow);
      toast.info("Creating workflow...");

      await createWorkflow(workflow);

      toast.success("Workflow created successfully");

      // Redirect to workflows page
      router.push("/workflows");
    } catch (error) {
      console.error("Error creating workflow", error);
      toast.error("Error creating workflow");
    }
  }, [wf, isRecurring, recurringInterval, router]);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  useEffect(() => {
    recurringInputParent.current &&
      autoAnimate(recurringInputParent.current, {});
  }, [recurringInputParent]);

  return (
    <>
      <DefaultLayout>
        <section>
          <div className="md:flex justify-between items-center">
            <div>
              <h1 className="font-akira text-secondary uppercase font-semibold text-sm">
                Workflow
              </h1>

              <div className="mt-6">
                <Input
                  type="text"
                  variant="underlined"
                  onChange={(e) => handleNameChange(e.target.value)}
                  value={wf?.name}
                  classNames={{
                    inputWrapper: "max-w-fit",
                    input: "text-4xl font-bold font-akira",
                  }}
                />
              </div>
            </div>
            <div className="mt-5 md:mt-0">
              <Checkbox isSelected={isRecurring} onValueChange={setRecurring}>
                Recurring
              </Checkbox>

              <div ref={recurringInputParent} className="mt-2">
                {isRecurring && (
                  <Input
                    size="sm"
                    label="Run every X Minutes"
                    type="number"
                    value={recurringInterval}
                    onChange={(e) => setRecurringInterval(e.target.value)}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            className={clsx(
              "mt-5 min-h-[60vh] p-6 rounded-xl border border-gray-200 dark:border-content4 flex flex-col items-center bg-gray-100 dark:bg-content1",
              theme === "dark"
                ? "workflow-background-dark"
                : "workflow-background",
            )}
          >
            <div ref={parent}>
              {(!wf || !wf.blocks || wf?.blocks?.length === 0) && (
                <Card
                  className="text-gray-500 max-w-xl min-h-24 text-sm md:text-base md:w-screen"
                  fullWidth
                >
                  <CardBody className="flex justify-center items-center ">
                    No blocks added yet. Start by adding one below.
                  </CardBody>
                </Card>
              )}
              {wf?.blocks?.map((block, i) => (
                <>
                  <BlockCard
                    key={block.id.toString() + i}
                    block={block}
                    // w-screen here due to some weird behaviour when using autoanimate
                    className="mt-5 md:w-screen"
                    onDismiss={handleRemoveBlock(i)}
                    onEditClick={() => {
                      setSelectedBlock(block);
                      onEditOpen();
                    }}
                  />
                  {wf.blocks && i < wf.blocks.length - 1 && (
                    <ArrowDownIcon
                      key={"arrow_i"}
                      className="mt-5 mx-auto"
                      size={24}
                    />
                  )}
                </>
              ))}
            </div>

            <Button
              className="mt-5 max-w-xl font-akira bg-secondary-100 dark:bg-secondary-300 hover:bg-secondary-200 border-2 border-dashed border-secondary-200 min-h-16 backdrop-blur"
              fullWidth
              onClick={onOpen}
            >
              <PlusIcon width={18} />
              Add Block
            </Button>
          </div>

          <div className="mt-5 md:flex justify-center items-center">
            <Button
              color="primary"
              onClick={handleCreate}
              className="font-akira w-full md:max-w-xl py-8 my-6"
            >
              Create
            </Button>
          </div>
        </section>
      </DefaultLayout>
      <AddBlockModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onAddBlock={(blockId) => {
          handleAddBlock(blockId);
          onEditOpen();
        }}
      />
      {selectedBlock && (
        <EditBlockModal
          selectedBlock={selectedBlock}
          isOpen={isEditOpen}
          onOpenChange={onEditOpenChange}
        />
      )}
    </>
  );
}
