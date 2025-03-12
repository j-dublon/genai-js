import type { CodegenConfig } from "@graphql-codegen/cli";
import path from "path";

const config: CodegenConfig = {
  schema: path.resolve(__dirname, "schema.json"),
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
