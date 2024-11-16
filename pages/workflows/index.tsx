import { title } from "@/components/primitives";
import {
  useMultipleWorkflowJobs,
  useWorkflowJobs,
} from "@/hooks/useWorkflowJobs";
import { useWorkflows } from "@/hooks/useWorkflows";
import DefaultLayout from "@/layouts/default";
import autoAnimate from "@formkit/auto-animate";
import { Button } from "@nextui-org/button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import clsx from "clsx";
import { PlayIcon } from "lucide-react";
import { useEffect, useRef } from "react";

enum StatusColor {
  IDLE = "gray",
  RUNNING = "blue",
  COMPLETED = "green",
  FAILED = "red",
}

export default function WorkflowsPage() {
  const { data: wfs, isLoading } = useWorkflows();

  const { data: jobs, isLoading: isJobsLoading } = useMultipleWorkflowJobs(
    // @ts-ignore
    wfs ? wfs.map((wf) => wf.id) : [],
  );

  const allJobs = jobs?.flat();

  return (
    <DefaultLayout>
      <h1
        className={title({
          color: "violet",
        })}
      >
        Workflows
      </h1>

      <section className="mt-5">
        <Table aria-label="Your Workflows">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            {/* <TableColumn>DESCRIPTION</TableColumn> */}
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            {wfs && !isLoading ? (
              wfs.map((wfs) => (
                <TableRow key={wfs.name}>
                  <TableCell>{wfs.name}</TableCell>
                  {/* <TableCell>{wfs.description || "-"}</TableCell> */}
                  <TableCell>
                    <div className="flex justify-between items-center">
                      <p className={clsx()}>Idle</p>
                      <Button color="primary">
                        <PlayIcon /> Run
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>
                  {isLoading ? "Loading workflows..." : "No workflows found"}
                </TableCell>
                {/* <TableCell> </TableCell> */}
                <TableCell> </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Table aria-label="Your Workflows" className="mt-5">
          <TableHeader>
            <TableColumn>JOB ID</TableColumn>
            <TableColumn>WORKFLOW ID</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            {allJobs && allJobs.length > 0 && !isJobsLoading ? (
              allJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.id}</TableCell>
                  <TableCell>{job.flow_id}</TableCell>
                  <TableCell>{job.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>
                  {isJobsLoading
                    ? "Loading workflow jobs..."
                    : "No workflow jobs found"}
                </TableCell>
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
