const createTokenBlock: Block = {
  id: "create-token",
  name: "Create ERC-20 Token",
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
