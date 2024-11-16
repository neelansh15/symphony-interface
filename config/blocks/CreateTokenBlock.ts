const createTokenBlock: Block = {
  id: "create-token",
  blockId: "create-token",
  name: "Create ERC-20 Token",
  description: "Create a new ERC-20 token",
  params: [
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
  ],
};

export default createTokenBlock;
