import { VectorStoreRetriever } from "@langchain/core/vectorstores";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import dotenv from "dotenv";

dotenv.config();

export const createRetriever = async (): Promise<VectorStoreRetriever> => {
  const embeddingLLM = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
  });

  const vectorStore = await PineconeStore.fromExistingIndex(embeddingLLM, {
    pineconeConfig: {
      indexName: "langchain-docs",
      config: { apiKey: process.env.PINECONE_API_KEY! },
    },
    namespace: "default",
  });

  return vectorStore.asRetriever();
};
