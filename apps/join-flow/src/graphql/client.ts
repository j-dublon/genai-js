import { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";

type RequestDocument = string | DocumentNode;

const createGraphQLClient = (
  endpoint: string,
  headers: Record<string, string> = {},
) => {
  return new GraphQLClient(endpoint, { headers });
};

export const getCuckooGraphClient = () => {
  const endpoint =
    process.env.NEXT_PUBLIC_CUCKOO_GRAPH_ENDPOINT ||
    "https://stage.graph.cuckoo.co/graphql";
  const apiKey = process.env.NEXT_PUBLIC_CUCKOO_GRAPH_APIKEY;

  const headers: Record<string, string> = {};
  if (apiKey) {
    headers["X-Api-Key"] = apiKey;
  }

  return createGraphQLClient(endpoint, headers);
};

export const getAuthedCuckooGraphClient = (authToken: string) => {
  const endpoint =
    process.env.NEXT_PUBLIC_CUCKOO_GRAPH_ENDPOINT ||
    "https://stage.graph.cuckoo.co/graphql";
  const apiKey = process.env.NEXT_PUBLIC_CUCKOO_GRAPH_APIKEY;

  const headers: Record<string, string> = {
    Authorization: authToken,
  };

  if (apiKey) {
    headers["X-Api-Key"] = apiKey;
  }

  return createGraphQLClient(endpoint, headers);
};

export const makeGraphQLRequest = async <
  T,
  V extends Record<string, unknown> = Record<string, unknown>,
>(
  document: RequestDocument,
  variables?: V,
  authToken?: string,
): Promise<T> => {
  const client = authToken
    ? getAuthedCuckooGraphClient(authToken)
    : getCuckooGraphClient();

  try {
    return await client.request<T>(
      document,
      variables as Record<string, unknown>,
    );
  } catch (error) {
    console.error("GraphQL request failed:", error);
    throw error;
  }
};
