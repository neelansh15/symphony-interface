interface Block {
  id: string;
}

interface Workflow {
  name?: string;
  startTimestamp?: number;
  blocks?: Block[];
}
