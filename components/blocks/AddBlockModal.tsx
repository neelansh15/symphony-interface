import { blocks } from "@/config/blocks";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { PlusIcon } from "lucide-react";

interface AddBlockModalProps {
  isOpen?: boolean;

  onOpenChange?: (isOpen: boolean) => void;

  onAddBlock?: (blockId: string) => void;

  // Not for now. In case we want to show output of previous block in the future
  previousBlockId?: string
}

export const AddBlockModal = ({
  isOpen,
  onOpenChange,
  onAddBlock,
}: AddBlockModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Add to Workflow</ModalHeader>
            <ModalBody className="pb-6">
              {blocks.map((block) => (
                <Button
                  key={block.id}
                  onClick={() => {
                    onAddBlock?.(block.blockId);
                    onClose();
                  }}
                  className="p-8 flex flex-row justify-between hover:bg-primary-500 hover:text-white"
                  variant="flat"
                >
                  <div className="text-left">
                    <h3 className="text-md font-semibold">{block.name}</h3>
                    <p className="text-xs">{block.description}</p>
                  </div>
                  <PlusIcon size={24} />
                </Button>
              ))}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
