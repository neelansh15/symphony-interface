export type OutputSchema = {
  name?: string;
  type?: "string" | "number";
};

export type InputSchema = OutputSchema & { label?: string };

export type BlockSchema = {
  id: number;
  created_at: string;
  created_by: string;
  name: string;
  description: string;
  location: string;
  vcs_path: string;
  params: {
    input: InputSchema[];
    output: OutputSchema[];
  };
};

export type FlowSchema = {
  id: number;
  name: string;
  description: string;
  trigger_type: string;
  trigger_condition: string;
  block_sequence: number[];
  block_params: any[];
  created_by: string;
};

export type JobStatusSchema = {
  id: number;
  flow_id: number;
  created_at: string;
  status: string;
  details: string;
};

export type Result<T = string> = {
  status: number;
  data: T;
};
