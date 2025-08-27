import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import dotenv from "dotenv";
import * as bedrock from "@langchain/aws";
import * as claude from "@langchain/anthropic";

dotenv.config();

const personalisedPitch = async (
  course: string,
  role: string,
  wordLimit: number,
) => {
  const promptTemplate = new PromptTemplate({
    template:
      "Describe the importance of learning {course} for a {role}. Limit the output to {wordLimit} words.",
    inputVariables: ["course", "role", "wordLimit"],
  });

  // Open AI
  const llm = new ChatOpenAI({
    temperature: 0,
    topP: 0,
    maxTokens: 150,
  });

  // AWS Bedrock
  // const llm = new bedrock.ChatBedrockConverse({
  //   model: "amazon.titan-text-lite-v1",
  //   maxTokens: 150,
  //   topP: 0.7,
  //   region: "us-east-1",
  //   credentials: {
  //     accessKeyId: "",
  //     secretAccessKey: "",
  //   },
  // });

  // Anthropic
  // const llm = new claude.ChatAnthropic({
  //   model: "claude-3-5-sonnet-20240620",
  //   maxTokens: 150,
  //   temperature: 0.7,
  // });

  const outputParser = new StringOutputParser();

  const legacyLlmChain = RunnableSequence.from([
    promptTemplate,
    llm,
    outputParser,
  ]);
  const result = await legacyLlmChain.invoke({ course, role, wordLimit });

  console.log("RES: ", result);
};

await personalisedPitch("Gen AI", "Javascript Developer", 100);
