import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Supabase project credentials
const SUPABASE_URL = 'https://wkdwqxmfmygqqyknysqx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZHdxeG1mbXlncXF5a255c3F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NTMyMTQsImV4cCI6MjA4NDEyOTIxNH0.hQwH4rTVHTwqyMz9xOujfrYtY4Q4y0ePgFn0Uo16epE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database types
export type Tables = {
  quotes: {
    id: string;
    text: string;
    author: string;
    category: string;
    created_at: string;
    is_quote_of_day: boolean;
  };
  users: {
    id: string;
    email: string;
    display_name: string | null;
    avatar_url: string | null;
    created_at: string;
    notification_time: string | null;
    theme: string;
    font_size: string;
  };
  favorites: {
    id: string;
    user_id: string;
    quote_id: string;
    created_at: string;
  };
  collections: {
    id: string;
    user_id: string;
    name: string;
    description: string | null;
    created_at: string;
    updated_at: string;
  };
  collection_quotes: {
    id: string;
    collection_id: string;
    quote_id: string;
    created_at: string;
  };
  quote_of_day: {
    id: string;
    quote_id: string;
    date: string;
  };
};

