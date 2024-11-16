import { blocks } from "@/config/blocks";
import { useCurrentWorkflow } from "@/hooks/useCurrentWorkflow";
import { firstLetterToUpperCase, getBlockById } from "@/utils";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface EditBlockModalProps {
  selectedBlock?: Block;

  isOpen?: boolean;

  onOpenChange?: (isOpen: boolean) => void;

  // Need this here to show tokens from previous block's outputs
  previousBlockId?: string;
}

export const EditBlockModal = ({
  selectedBlock,
  isOpen,
  onOpenChange,
}: EditBlockModalProps) => {
  if (!selectedBlock) {
    return null;
  }

  const { wf, setWf } = useCurrentWorkflow();

  const initialParams = selectedBlock?.params || [];

  const [localParams, setLocalParams] = useState<Param[]>(initialParams);

  console.log("Local Params and Selected Block", localParams, selectedBlock);

  const handleSave = (): void => {
    if (!wf || !wf.blocks) return;

    const updatedBlocks = wf.blocks.map((b) =>
      b.id === selectedBlock.id ? { ...b, params: localParams } : b,
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
    setLocalParams(selectedBlock.params);
  }, [selectedBlock]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="pt-4 flex-col">
              <p className="text-sm text-secondary-500">Editing</p>
              <p className="mt-1 w-fit text-xl font-semibold">
                {selectedBlock.name}
              </p>
            </ModalHeader>
            <ModalBody className="pb-6">
              <Card fullWidth>
                <CardBody className="max-h-96 overflow-y-auto">
                  {localParams.map((param) => (
                    <Input
                      key={param.name}
                      label={firstLetterToUpperCase(param.label || param.name)}
                      description={firstLetterToUpperCase(
                        param.type === "string" ? "text" : param.type,
                      )}
                      type="text"
                      className="mt-1 mb-1"
                      value={param.value?.toString() || ""}
                      onChange={(e) => handleChange(param.name, e.target.value)}
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
