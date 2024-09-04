import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { OpenAIEmbeddings } from '@langchain/openai';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const openAIApiKey = process.env.OPENAI_API_KEY;
const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const embeddings = new OpenAIEmbeddings({ openAIApiKey });

const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabase,
  tableName: 'documents',
  queryName: 'match_documents',
});

const retriever = vectorStore.asRetriever();

export default retriever;
