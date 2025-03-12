## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000/join-flow](http://localhost:3000/join-flow) with your browser to see the result.

You can start editing the page by modifying `app/join-flow/page.tsx`.

## Code gen

```bash
npm run update-schema
```

To fetch the latest GraphQL schema:

This script downloads the latest schema from the configured GraphQL endpoint and saves it as schema.json.

Generating TypeScript Types
To generate TypeScript types for your GraphQL queries:

```bash
npm run build:codegen
```

Ensure your .env file contains the correct NEXT_PUBLIC_CUCKOO_GRAPH_ENDPOINT and NEXT_PUBLIC_CUCKOO_GRAPH_APIKEY
Generated types are saved in src/**generated**/
The schema.json file should be ignored by version control
