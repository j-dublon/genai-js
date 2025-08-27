import dotenv from "dotenv";
import { loadDocuments } from "./loadDocuments";
import { splitDocuments } from "./splitDocuments";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import cliProgress from "cli-progress";

dotenv.config();

const rawDocuments = await loadDocuments();

const chunkedDocuments = await splitDocuments(rawDocuments);

const embeddingLLM = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const texts = chunkedDocuments.map((doc) => doc.pageContent);
const embeddings = await embeddingLLM.embedDocuments(texts);

const vectors = embeddings.map((values, i) => {
  const { loc, ...metadata } = chunkedDocuments[i].metadata;

  return {
    id: `doc-${i}`,
    values,
    metadata,
  };
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const pineconeIndex = pinecone.index("langchain-docs");

console.log("Starting vectorization...");
const progressBar = new cliProgress.SingleBar({});
progressBar.start(vectors.length, 0);

for (let i = 0; i < vectors.length; i = i + 100) {
  const batch = vectors.slice(i, i + 100);
  await pineconeIndex.namespace("default").upsert(batch);

  progressBar.increment(batch.length);
}

progressBar.stop();
console.log("Chunked documents stored in pinecone");
