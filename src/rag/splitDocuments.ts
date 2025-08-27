import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { loadDocuments } from "./loadDocuments";

const splitDocuments = async (
  rawDocuments: Document[],
): Promise<Document[]> => {
  console.log("Splitting docs...");
  const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", {
    chunkSize: 500,
    chunkOverlap: 100,
  });

  const documentChunks = await splitter.splitDocuments(rawDocuments);

  console.log(
    `${rawDocuments.length} documents split into ${documentChunks.length} chunks`,
  );

  return documentChunks;
};
