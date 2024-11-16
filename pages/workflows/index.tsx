import { title } from "@/components/primitives";
import { useWorkflows } from "@/hooks/useWorkflows";
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
  const { data: wfs, isLoading } = useWorkflows();

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
        {isLoading && <p>Loading...</p>}
        <Table aria-label="Your Workflows">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>DESCRIPTION</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            {wfs && !isLoading ? (
              wfs.map((wfs) => (
                <TableRow key={wfs.name}>
                  <TableCell>{wfs.name}</TableCell>
                  <TableCell>{wfs.description || "-"}</TableCell>
                  <TableCell>
                    <p className={clsx()}>Active</p>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No workflows found</TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </DefaultLayout>
  );
}
