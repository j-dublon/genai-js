import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import dotenv from "dotenv";

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

  const formattedPrompt = await promptTemplate.format({
    course,
    role,
    wordLimit,
  });

  const llm = new ChatOpenAI();

  const outputParser = new StringOutputParser();

  // Legacy Chain
  //   const legacyLlmChain = RunnableSequence.from([
  //     promptTemplate,
  //     llm,
  //     outputParser,
  //   ]);
  //   const result = await legacyLlmChain.invoke({ course, role, wordLimit });

  // LCEL Chain
  const lcelChain = promptTemplate.pipe(llm).pipe(outputParser);
  const result = await lcelChain.invoke({ course, role, wordLimit });

  console.log("RES: ", result);
};

await personalisedPitch("AWS", "Javascript Developer", 100);
