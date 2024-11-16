import { JobStatusSchema } from "@/types/apiTypes";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import clsx from "clsx";

interface LogModalProps {
  job: JobStatusSchema;
}
export const LogModal = ({ job }: LogModalProps) => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  return (
    <div>
      <Button variant="flat" onClick={onOpen} size="sm">
        View Logs
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Logs for Job {job.id}</ModalHeader>
              <ModalBody
                className={clsx(
                  "max-h-96 overflow-y-auto",
                  job.status === "FAILED" && "text-red-500",
                )}
              >
                {job.details}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
