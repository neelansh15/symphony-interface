import { getBlockById } from "@/utils";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardProps } from "@nextui-org/card";
import clsx from "clsx";
import { EditIcon, TrashIcon } from "lucide-react";

interface IBlockCard extends CardProps {
  blockId?: string;

  onDismiss?: () => void;
}

export const BlockCard = ({
  blockId,
  className,
  onDismiss,
  ...props
}: IBlockCard) => {
  if (!blockId) return null;

  const block = getBlockById(blockId);

  return (
    <Card fullWidth className={clsx("max-w-xl", className)} {...props}>
      <CardBody>
        <div className="flex justify-between items-center">
          <p className="font-bold">{block.name || block.id}</p>
          <div className="flex items-center space-x-2">
            <Button variant="light" isIconOnly>
              <EditIcon width={18} />
            </Button>
            <Button
              color="danger"
              variant="light"
              onClick={() => onDismiss?.()}
              isIconOnly
            >
              <TrashIcon width={18} />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
