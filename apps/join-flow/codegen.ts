import type { CodegenConfig } from "@graphql-codegen/cli";

const graphEndpoint =
  process.env.NEXT_PUBLIC_CUCKOO_GRAPH_ENDPOINT ||
  "https://stage.graph.cuckoo.co/graphql";
const graphApiKey = process.env.NEXT_PUBLIC_CUCKOO_GRAPH_APIKEY || "";

const config: CodegenConfig = {
  schema: {
    [graphEndpoint]: {
      headers: {
        "x-api-key": graphApiKey as string,
      },
    },
  },
  documents: ["./src/**/*.{ts,tsx}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      config: {
        strictScalars: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
