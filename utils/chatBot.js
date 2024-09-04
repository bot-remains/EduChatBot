import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import {
  RunnablePassthrough,
  RunnableSequence,
} from '@langchain/core/runnables';
import { ChatOpenAI } from '@langchain/openai';
import 'dotenv/config';
import getPageContent from './getPageContent.js';
import retriever from './retriever.js';

const openAIApiKey = process.env.OPENAI_API_KEY;

const model = new ChatOpenAI({
  openAIApiKey,
});

// const conversationHistory = [];

const SAQTemplate = `I know that you know the concept of standalone questions. Now, I want you to generate the standalone question based on the conversation history (if exists) and the given statement.
statement: {statement}
standalone question:`;

const SAQPrompt = PromptTemplate.fromTemplate(SAQTemplate);

const answerTemplate = `When someone greet you, you should greet them back too. You are a good chatbot which is going to help students, depending on the context. Try to find the answer in the context. If it is not there then also try to find it in the conversation history. You'll have to give the answer properly and it should be right. If you don't know the answer, you'll say "I'm sorry. I don't know the answer.". but don't give the wrong answer. And try to be as friendly as possible.
context: {context}
question: {question}
answer:`;

const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

const SAQChain = SAQPrompt.pipe(model).pipe(new StringOutputParser());

const retrieverChain = RunnableSequence.from([
  (prevResult) => prevResult.SAQ,
  retriever,
  getPageContent,
]);

const answerChain = answerPrompt.pipe(model).pipe(new StringOutputParser());

const mainChain = RunnableSequence.from([
  {
    SAQ: SAQChain,
    original: new RunnablePassthrough(),
  },
  {
    context: retrieverChain,
    question: ({ original }) => original.statement,
    // conversationHistory: ({ original }) => original.conversationHistory,
  },
  answerChain,
]);

export const chatBotResponse = async (statement) => {
  const response = await mainChain.invoke({
    statement,
    // conversationHistory: historyFormat(conversationHistory),
  });
  return response;
};
// conversationHistory.push(question);
// conversationHistory.push(response);
