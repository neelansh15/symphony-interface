import { LogModal } from "@/components/LogModal";
import { title } from "@/components/primitives";
import {
  useMultipleWorkflowJobs,
  useWorkflowJobs,
} from "@/hooks/useWorkflowJobs";
import { useWorkflows } from "@/hooks/useWorkflows";
import DefaultLayout from "@/layouts/default";
import { createJob } from "@/utils/api/jobStatus";
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
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

enum JobStatusColor {
  SUBMITTED = "gray",
  RUNNING = "blue",
  COMPLETED = "green",
  FAILED = "red",
}

export default function WorkflowsPage() {
  const { data: wfs, isLoading } = useWorkflows();
  const [isSubmittingJob, setIsSubmittingJob] = useState<
    Record<string, boolean>
  >({});

  const {
    data: jobs,
    isLoading: isJobsLoading,
    refetch: refetchJobs,
  } = useMultipleWorkflowJobs(
    // @ts-ignore
    wfs ? wfs.map((wf) => wf.id) : [],
  );

  const allJobs = jobs?.flat();

  const handleRunWorkflow = async (id: string) => {
    try {
      toast.info("Creating job...");
      setIsSubmittingJob((prev) => ({ ...prev, [id]: true }));
      await createJob({
        flow_id: Number(id),
        status: "SUBMITTED",
      });
      setIsSubmittingJob((prev) => ({ ...prev, [id]: false }));

      refetchJobs();
      toast.success("Job created successfully!");
    } catch (error) {
      setIsSubmittingJob((prev) => ({ ...prev, [id]: false }));
      console.error("Error creating job", error);
      toast.error("Error creating job");
    }
  };

  const getJobStatusColor = (jobStatus?: string) => {
    switch (jobStatus) {
      case "SUBMITTED":
        return "text-gray-500";
      case "RUNNING":
        return "text-blue-500";
      case "SUCCESS":
        return "text-green-500";
      case "FAILED":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getWorkflowName = (flowId: string | number) => {
    const workflow = wfs?.find((wf) => wf.id === flowId);
    return workflow?.name || flowId;
  };

  return (
    <DefaultLayout>
      <h1
        className={clsx(
          title({
            size: "lg",
          }),
          "font-akira",
        )}
      >
        Workflows
      </h1>

      <section className="mt-5">
        <Table aria-label="Your Workflows">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>DESCRIPTION</TableColumn>
          </TableHeader>
          <TableBody>
            {wfs && !isLoading ? (
              wfs
              .toSorted((a, b) => +b.id - +a.id)
              .map((wfs) => (
                <TableRow key={wfs.name}>
                  {/* @ts-ignore */}
                  <TableCell>{wfs.id}</TableCell>
                  <TableCell>{wfs.name}</TableCell>
                  <TableCell>
                    <div className="flex justify-between items-center">
                      <span>{wfs.description || "-"}</span>
                      <Button
                        onClick={() => handleRunWorkflow(wfs.id)}
                        color="primary"
                        isLoading={isSubmittingJob[wfs.id]}
                        isDisabled={isSubmittingJob[wfs.id]}
                      >
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
                <TableCell> </TableCell>
                <TableCell> </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <h2 className="mt-10 font-akira font-bold text-4xl text-cyan-950 dark:text-cyan-100">
          Jobs
        </h2>
        <Table aria-label="Your Workflows" className="mt-5">
          <TableHeader>
            <TableColumn>JOB ID</TableColumn>
            <TableColumn>WORKFLOW</TableColumn>
            <TableColumn>DATETIME</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            {allJobs && allJobs.length > 0 && !isJobsLoading ? (
              allJobs
                .toSorted(
                  (a, b) =>
                    new Date(b.created_at || 0).getTime() -
                    new Date(a.created_at || 0).getTime(),
                )
                .map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.id}</TableCell>
                    <TableCell>{getWorkflowName(job.flow_id)}</TableCell>
                    <TableCell>
                      {job.created_at
                        ? new Date(job.created_at).toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell className={clsx(getJobStatusColor(job.status))}>
                      <div className="flex justify-between items-center">
                        {job.status}
                        {job.status === "FAILED" && <LogModal job={job} />}
                      </div>
                    </TableCell>
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
                <TableCell> </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </DefaultLayout>
  );
}
