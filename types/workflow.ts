interface Field {
  name: string;
  type: "string" | "number";
}

interface Param extends Field {
  value?: string | number;
}

interface Block {
  id: string;
  params: Param[];

  name?: string;
  description?: string;

  input?: Field[];
  output?: Field[];
}

interface Workflow {
  name?: string;
  startTimestamp?: number;
  blocks?: Block[];
}
