export interface Quote {
  id: string;
  text: string;
  author: string;
  category: Category;
  created_at: string;
  is_quote_of_day?: boolean;
}

export type Category = 
  | 'motivation'
  | 'love'
  | 'success'
  | 'wisdom'
  | 'humor'
  | 'life'
  | 'friendship'
  | 'happiness';

export interface User {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  notification_time: string | null;
  theme: string;
  font_size: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  quote_id: string;
  created_at: string;
  quote?: Quote;
}

export interface Collection {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  quote_count?: number;
}

export interface CollectionQuote {
  id: string;
  collection_id: string;
  quote_id: string;
  created_at: string;
  quote?: Quote;
}

export interface QuoteOfDay {
  id: string;
  quote_id: string;
  date: string;
  quote?: Quote;
}

export type CardStyle = 'gradient' | 'minimal' | 'elegant';

export interface ShareCardConfig {
  style: CardStyle;
  backgroundColor?: string;
  textColor?: string;
  showAuthor: boolean;
}

