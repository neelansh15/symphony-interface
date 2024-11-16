import { blocks } from "@/config/blocks";
import { useCurrentWorkflow } from "@/hooks/useCurrentWorkflow";
import { firstLetterToUpperCase } from "@/utils";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { useEffect, useState } from "react";

interface EditBlockModalProps {
  selectedBlock?: Block;

  isOpen?: boolean;

  onOpenChange?: (isOpen: boolean) => void;
}

export const EditBlockModal = ({
  selectedBlock,
  isOpen,
  onOpenChange,
}: EditBlockModalProps) => {
  const { wf, setWf } = useCurrentWorkflow();

  const initialParams = selectedBlock?.params || [];

  const [localParams, setLocalParams] = useState<Param[]>(initialParams);

  // Find previous block if it exists
  const previousBlock = wf?.blocks?.find((_, index, arr) => {
    const currentBlockIndex = arr.findIndex((b) => b.id === selectedBlock?.id);
    return index === currentBlockIndex - 1;
  });
  const previousBlockOutput = previousBlock?.output || [];

  const handleSave = (): void => {
    if (!wf || !wf.blocks) return;

    const updatedBlocks = wf.blocks.map((b) =>
      b.id === selectedBlock?.id ? { ...b, params: localParams } : b,
    );
    setWf({ ...wf, blocks: updatedBlocks });

    onOpenChange?.(false);
  };

  const handleChange = (paramName: string, value: string): void => {
    setLocalParams((prevParams) =>
      prevParams.map((param) =>
        param.name === paramName ? { ...param, value } : param,
      ),
    );
  };

  useEffect(() => {
    setLocalParams(selectedBlock ? selectedBlock.params : []);
  }, [selectedBlock]);

  if (!selectedBlock) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="top-gradient">
        {() => (
          <>
            <ModalHeader className="pt-4 flex-col">
              <p className="text-sm text-secondary-500 font-akira">Editing</p>
              <p className="w-fit text-xl font-semibold font-akira">
                {selectedBlock.name}
              </p>
            </ModalHeader>
            <ModalBody className="pb-6">
              {previousBlockOutput.length > 0 && (
                <div>
                  <p className="text-sm mb-2">
                    <span className="font-semibold">
                      Available results from previous block.
                    </span>
                    <br />
                    <span className="text-gray-500 dark:text-gray-300">
                      Use{" "}
                      <code className="bg-gray-200 dark:bg-default-200">
                        &#123;&#123; variableName &#125;&#125;
                      </code>{" "}
                      to access value inside the fields
                    </span>
                  </p>
                  {previousBlockOutput.map((param) => (
                    <Chip
                      color="default"
                      size="sm"
                      key={param.name}
                      className="mr-2 mb-2"
                    >
                      {param.name}
                    </Chip>
                  ))}
                </div>
              )}
              <Card fullWidth>
                <CardBody className="max-h-96 overflow-y-auto">
                  {localParams.map((param) => (
                    <Input
                      key={param.name}
                      label={firstLetterToUpperCase(
                        param.label || param.name || "",
                      )}
                      description={firstLetterToUpperCase(
                        param.type === "string" ? "text" : param.type || "",
                      )}
                      type="text"
                      className="mt-1 mb-1"
                      value={param.value?.toString() || ""}
                      onChange={(e) =>
                        handleChange(param.name || "", e.target.value)
                      }
                    />
                  ))}
                </CardBody>
              </Card>
              <Button color="primary" className="mt-4" onClick={handleSave}>
                Save
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
