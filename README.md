# Gen AI Agent - LangChain specialist

This app runs a chat interface in the terminal that uses the OpenAI LLM to answer the user's qeustions. It provides several [documents](docs) from the LangChain website to supplement the data provided by the OpenAI model (gpt-3.5-turbo, which has no knowledge of LangChain, having been released prior to its devlopment). This project utilises RAG (retrieval-augmented generation), embeddings, and a Pinecone vector database. When the app is run via [ragWithChatHistory.ts](src/rag/ragWithChatHistory.ts), it stores and utilises the chat history, ensuring each of the user's questions are contextualised.

## Testing the agent

If you would like to interact with this agent, you will need to set up a .env file with the following variables, using your own OpenAI, LangChain, and Pinecone API keys.

- OPENAI_API_KEY=
- LANGCHAIN_VERBOSE=false
- PINECONE_API_KEY=
- LANGCHAIN_API_KEY=
- LANGCHAIN_TRACING_V2=true

Here's what it looks like in use:
