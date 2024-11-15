import { Card, CardBody, CardProps } from "@nextui-org/card";
import clsx from "clsx";

interface IBlockCard extends CardProps {
  id?: string;
}

export const BlockCard = ({ id, className, ...props }: IBlockCard) => {
  return (
    <Card fullWidth className={clsx("max-w-xl", className)} {...props}>
      <CardBody>Hey</CardBody>
    </Card>
  );
};
