import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { OpenAIEmbeddings } from '@langchain/openai';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import fs from 'node:fs';

const openAIApiKey = process.env.OPENAI_API_KEY;
const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

export const instantiseVectorStore = async () => {
  try {
    const emebeddings = new OpenAIEmbeddings({ openAIApiKey });

    const data = fs.readFileSync('../Data/sample-college-data.txt', 'utf8');
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
    });
    const splittedText = await splitter.createDocuments([data]);

    const supabase = createClient(supabaseUrl, supabaseKey);

    const instantiseSupabase = async () => {
      await SupabaseVectorStore.fromDocuments(splittedText, emebeddings, {
        client: supabase,
        tableName: 'documents',
      });
    };
  } catch (e) {
    console.error(e);
  }
};
