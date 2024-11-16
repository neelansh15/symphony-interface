import { blocks } from "@/config/blocks";
import { useAllBlocks } from "@/hooks/useAllBlocks";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

interface AddBlockModalProps {
  isOpen?: boolean;

  onOpenChange?: (isOpen: boolean) => void;

  onAddBlock?: (blockId: string) => void;

  // Not for now. In case we want to show output of previous block in the future
  previousBlockId?: string;
}

export const AddBlockModal = ({
  isOpen,
  onOpenChange,
  onAddBlock,
}: AddBlockModalProps) => {
  const { data: blocksList } = useAllBlocks();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlocks = blocksList?.filter((block) => {
    const query = searchQuery.toLowerCase();
    return (
      block.name.toLowerCase().includes(query) ||
      (block.description?.toLowerCase().includes(query) ?? false)
    );
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="top-gradient">
        {(onClose) => (
          <>
            <ModalHeader className="mt-1 flex flex-col">
              <p className="text-xs text-secondary-500 font-bold">BLOCK</p>
              <p>Add to Workflow</p>

              <Input
                variant="flat"
                classNames={{
                  base: "w-full",
                  input: "text-small",
                  mainWrapper: "mt-3",
                  inputWrapper:
                    "py-5 font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                }}
                placeholder="Type to search..."
                size="sm"
                startContent={<SearchIcon size={18} />}
                type="search"
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
            </ModalHeader>
            <ModalBody className="pb-6 max-h-96 overflow-y-auto">
              {filteredBlocks &&
                filteredBlocks.map((block) => (
                  <Button
                    key={block.id}
                    onClick={() => {
                      onAddBlock?.(block.id ? block.id.toString() : "");
                      onClose();
                    }}
                    className="p-8 flex flex-row justify-between hover:bg-primary-500 hover:text-white group"
                    variant="flat"
                  >
                    <div className="text-left">
                      <h3 className="text-md font-semibold">{block.name}</h3>
                      <p className="text-xs text-default-500 group-hover:text-inherit">
                        {block.description?.length > 50
                          ? block.description.slice(0, 50) + "..."
                          : block.description}
                      </p>
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
