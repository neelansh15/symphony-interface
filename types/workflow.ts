interface Field {
  name?: string;
  type?: "string" | "number";
}

interface Param extends Field {
  label?: string;
  value?: string | number;
}

interface Block {
  blockId: string;
  id: string | number;
  params: Param[];

  name?: string;
  description?: string;

  input?: Field[];
  output?: Field[];
}

interface Workflow {
  name?: string;
  description?: string;
  blocks?: Block[];
}
