const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { 
  ListResourcesRequestSchema, 
  ReadResourceRequestSchema 
} = require("@modelcontextprotocol/sdk/types.js");
const fs = require("fs");
const path = require("path");

const server = new Server(
  {
    name: "doatinga-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
    },
  }
);

const RESOURCES = {
  "guide": {
    uri: "mcp://doatinga/guide",
    name: "Guia de Estrutura",
    mimeType: "text/markdown",
    filePath: "GUIDE_ESTRUTURA.md"
  },
  "history": {
    uri: "mcp://doatinga/history",
    name: "Histórico da Sessão",
    mimeType: "text/markdown",
    filePath: "SESSION_HISTORY.md"
  }
};

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: Object.values(RESOURCES).map(r => ({
      uri: r.uri,
      name: r.name,
      mimeType: r.mimeType
    }))
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const resource = Object.values(RESOURCES).find(r => r.uri === request.params.uri);
  if (!resource) {
    throw new Error(`Resource not found: ${request.params.uri}`);
  }

  const content = fs.readFileSync(path.join(__dirname, resource.filePath), "utf8");
  return {
    contents: [
      {
        uri: resource.uri,
        mimeType: resource.mimeType,
        text: content
      }
    ]
  };
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("DoaTinga MCP Server running on stdio");
}

run().catch(console.error);
