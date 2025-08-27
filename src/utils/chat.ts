import readlinePromises from "readline/promises";
import { RunnableInterface } from "@langchain/core/runnables";
import { Document } from "@langchain/core/documents";
import { ReadableStream } from "node:stream/web";

// Chat handler function type - returns answer as Langchain Runnable output
export type ChatHandler = (question: string) => Promise<{
  answer:
    | ReturnType<RunnableInterface["invoke"]>
    | ReturnType<RunnableInterface["stream"]>;

  sources?: string[];
  answerCallBack?: (answerText: string) => Promise<void>;
}>;

// Chat util - creates chat UI in terminal
export const chat = async (handler: ChatHandler) => {
  const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    const question = await rl.question("Human: ");
    const response = await handler(question);
    const answer = await response.answer;

    let answerText = "";

    if (answer instanceof ReadableStream) {
      process.stdout.write("AI:");
      let isFirstAnswerChunk = true;
      for await (const chunk of answer) {
        if (typeof chunk === "string") {
          // If chunk is a string response print it
          process.stdout.write(`${chunk}`);
          answerText += chunk;
        } else {
          // If chunk is a streamed object, find answer and print it
          if (chunk.answer !== undefined) {
            if (isFirstAnswerChunk) {
              process.stdout.write("Answer: ");
              isFirstAnswerChunk = false;
            }
            process.stdout.write(`${chunk.answer}`);
            answerText += chunk.answer;
          } else {
            // For other stuff (e.g. question, context) just print it as it is
            console.log(`${JSON.stringify(chunk)}`);

            if (chunk.context) {
              // If chunk is a RAG context then extract sources and print them
              const docs: Document[] = chunk.context;
              const sources = docs.map((doc) => doc.metadata.source);
              console.log(`Sources:\n${sources.join("\n")}`);
            }
          }
        }
      }
      console.log("\n");
    } else if (typeof answer === "string") {
      console.log(`AI: ${answer.trimStart()}`);
      answerText = answer;
    } else {
      // If LLM response is a json object print it
      console.log(`AI: ${JSON.stringify(answer)}`);
    }

    // If sources are provided print them too
    if (response.sources) {
      console.log(`Sources:\n${response.sources.join("\n")}`);
    }

    // If answer call back is provided then invoke the callback before moving to next question
    // Useful for maintaining the chat history
    if (response.answerCallBack) {
      await response.answerCallBack(answerText);
    }
  }
};
