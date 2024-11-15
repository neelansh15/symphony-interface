import { blocks } from "@/config/blocks";
import { useCurrentWorkflow } from "@/hooks/useCurrentWorkflow";
import { firstLetterToUpperCase, getBlockById } from "@/utils";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

interface EditBlockModalProps {
  blockId?: string;

  isOpen?: boolean;

  onOpenChange?: (isOpen: boolean) => void;

  // Need this here to show tokens from previous block's outputs
  previousBlockId?: string;
}

export const EditBlockModal = ({
  blockId,
  isOpen,
  onOpenChange,
}: EditBlockModalProps) => {
  if (!blockId) {
    return null;
  }

  const { wf, setWf } = useCurrentWorkflow();

  const baseBlock = getBlockById(blockId);
  const currentBlock = wf?.blocks
    ? wf.blocks.find((b) => b.id === blockId)
    : { params: [] };

  const initialParams = baseBlock.params.map((param) => ({
    ...param,
    value:
      currentBlock?.params?.find((p) => p.name === param.name)?.value || "",
  }));

  const [localParams, setLocalParams] = useState<Param[]>(initialParams);

  const handleSave = (): void => {
    if (!wf || !wf.blocks) return;

    const updatedBlocks = wf.blocks.map((b) =>
      b.id === blockId ? { ...b, params: localParams } : b,
    );
    setWf({ ...wf, blocks: updatedBlocks });
    console.log("Saving block", baseBlock);
  };

  const handleChange = (paramName: string, value: string): void => {
    setLocalParams((prevParams) =>
      prevParams.map((param) =>
        param.name === paramName ? { ...param, value } : param,
      ),
    );
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose: () => void) => (
          <>
            <ModalHeader>
              Editing &nbsp;
              <span className="bg-success-100 rounded-full px-2">{baseBlock.name}</span>
            </ModalHeader>
            <ModalBody className="pb-6">
              <Card fullWidth>
                <CardBody className="max-h-96 overflow-y-auto">
                  {localParams.map((param) => (
                    <Input
                      key={param.name}
                      label={firstLetterToUpperCase(param.name)}
                      description={param.type}
                      type="text"
                      className="mt-1 mb-1"
                      value={param.value?.toString() || ""}
                      onChange={(e) => handleChange(param.name, e.target.value)}
                    />
                  ))}
                </CardBody>
              </Card>
              <Button className="mt-4" onClick={handleSave}>
                Save
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
