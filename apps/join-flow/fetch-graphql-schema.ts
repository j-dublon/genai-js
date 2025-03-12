const { getIntrospectionQuery } = require("graphql");
const { GraphQLClient } = require("graphql-request");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const NODE_ENV = process.env.NODE_ENV;

const envFiles = [`.env.${NODE_ENV}`, ".env.local", ".env"];

let envFileLoaded = false;
for (const file of envFiles) {
  const filePath = path.resolve(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`Loading environment from: ${file}`);
    dotenv.config({ path: filePath });
    envFileLoaded = true;
    break;
  }
}

if (!envFileLoaded) {
  console.log(
    "No environment file found. Using environment variables if available.",
  );
}

const downloadGraphQLSchema = async () => {
  const endpoint = process.env.NEXT_PUBLIC_CUCKOO_GRAPH_ENDPOINT;
  const apiKey = process.env.NEXT_PUBLIC_CUCKOO_GRAPH_APIKEY;

  try {
    const headers = {
      "x-api-key": apiKey,
    };

    const graphQLClient = new GraphQLClient(endpoint, {
      headers,
    });

    const result = await graphQLClient.request(getIntrospectionQuery());

    fs.writeFileSync("./schema.json", JSON.stringify(result, null, 2));
    console.log("Schema fetched successfully!");
  } catch (error) {
    console.error("Failed to fetch schema:", error);
    process.exit(1);
  }
};

downloadGraphQLSchema();
