import { Document } from "langchain/document";
import { crawlLangchainDocsUrls } from "./crawlDocuments";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import cliProgress from "cli-progress";

const progressBar = new cliProgress.SingleBar({});

export const loadDocuments = async (): Promise<Document[]> => {
  const langChainDocsUrls = await crawlLangchainDocsUrls();

  console.log(
    `Starting document download. ${langChainDocsUrls?.length} total documents.`,
  );

  progressBar.start(langChainDocsUrls?.length, 0);
  const rawDocuments: Document[] = [];

  for (const url of langChainDocsUrls) {
    const loader = new CheerioWebBaseLoader(url);
    const docs = await loader.load();
    rawDocuments.push(...docs);
    progressBar.increment();
  }

  progressBar.stop();
  console.log(`${rawDocuments.length} documents loaded.`);
  return rawDocuments;
};
