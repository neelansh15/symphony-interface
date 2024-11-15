interface Field {
  name: string;
  type: "string" | "number" | "boolean" | "object" | "array";
}

interface Block {
  id: string;
  params: Field[];

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
