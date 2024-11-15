import { blocks } from "@/config/blocks";
import { useCurrentWorkflow } from "@/hooks/useCurrentWorkflow";
import { firstLetterToUpperCase, getBlockById } from "@/utils";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { PlusIcon } from "lucide-react";

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

  const block = getBlockById(blockId);

  const { wf, setWf } = useCurrentWorkflow();

  const handleSave = () => {
    console.log("Saving block", block);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              Editing &nbsp;<mark>{block.name}</mark>
            </ModalHeader>
            <ModalBody className="pb-6">
              <Card fullWidth>
                <CardBody className="max-h-96 overflow-y-auto">
                  {block.params.map((param) => (
                    <Input
                      key={param.name}
                      label={firstLetterToUpperCase(param.name)}
                      description={param.type}
                      type="text"
                      className="mt-1 mb-1"
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
