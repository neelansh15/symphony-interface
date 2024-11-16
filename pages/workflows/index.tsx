import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import clsx from "clsx";

enum StatusColor {
  IDLE = "gray",
  RUNNING = "blue",
  COMPLETED = "green",
  FAILED = "red",
}

export default function WorkflowsPage() {
  return (
    <DefaultLayout>
      <h1
        className={title({
          color: "blue",
        })}
      >
        Workflows
      </h1>

      <section className="mt-5">
        <Table aria-label="Your Workflows">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>CEO</TableCell>
              <TableCell>
                <p className={clsx()}>Active</p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </DefaultLayout>
  );
}
