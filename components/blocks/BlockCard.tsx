import { getBlockById } from "@/utils";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardProps } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import clsx from "clsx";
import { EditIcon, TrashIcon } from "lucide-react";

interface IBlockCard extends CardProps {
  block?: Block;

  onEditClick?: () => void;
  onDismiss?: () => void;
}

export const BlockCard = ({
  block,
  className,
  onDismiss,
  onEditClick,
  ...props
}: IBlockCard) => {
  if (!block) return null;

  return (
    <Card
      fullWidth
      className={clsx("max-w-xl border border-secondary-100", className)}
      {...props}
    >
      <CardBody>
        <div className="flex justify-between items-center">
          <p className="font-bold">{block.name || block.id}</p>
          <div className="flex items-center space-x-2">
            <Button variant="light" onClick={onEditClick} isIconOnly>
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
        <p className="text-sm text-secondary-900 font-medium space-x-1">
          {block.params
            .map(
              (param, i, arr) =>
                param.value && (
                  <Chip>{param.value}</Chip>
                ),
            )
            .slice(0, 5)}
        </p>
      </CardBody>
    </Card>
  );
};
