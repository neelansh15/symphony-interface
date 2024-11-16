const createTokenBlock: Block = {
  id: "create-token",
  blockId: "Create Token",
  name: "Create ERC-20 Token",
  description: "Create a new ERC-20 token",
  params: [
    {
      name: "name",
      label: "Name",
      type: "string",
    },
    {
      name: "symbol",
      label: "Symbol",
      type: "string",
    },
    {
      name: "supply",
      label: "Supply",
      type: "number",
    },
    {
      name: "private_key",
      label: "Private Key",
      type: "string",
    },
  ],
  input: [
    {
      name: "name",
      type: "string",
    },
    {
      name: "symbol",
      type: "string",
    },
    {
      name: "supply",
      type: "number",
    },
    {
      name: "private_key",
      type: "string",
    },
  ],
  output: [
    {
      name: "address",
      type: "string",
    },
  ],
};

export default createTokenBlock;
