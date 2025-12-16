import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.error('REACT_APP_SUPABASE_URL:', supabaseUrl);
  console.error('REACT_APP_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'EXISTS' : 'MISSING');
}

console.log('URL:', process.env.REACT_APP_SUPABASE_URL);
console.log('KEY exists:', !!process.env.REACT_APP_SUPABASE_ANON_KEY);


export const supabase = createClient(supabaseUrl, supabaseAnonKey);