import { create } from 'zustand';
import { supabase } from '../services/supabase';
import { 
  MOCK_QUOTES, 
  getQuoteOfDay, 
  INITIAL_FAVORITES, 
  INITIAL_COLLECTIONS,
  COLLECTION_QUOTES 
} from '../services/mockData';
import type { Quote, Collection } from '../types';

// Set to false to use Supabase, true for demo mode
// Change to false once Supabase is fully configured
const DEMO_MODE = true;

interface QuoteState {
  quotes: Quote[];
  quoteOfDay: Quote | null;
  favorites: string[];
  collections: Collection[];
  collectionQuotes: { [collectionId: string]: string[] };
  isLoading: boolean;
  searchQuery: string;
  selectedCategory: string | null;

  // Actions
  fetchQuotes: () => Promise<void>;
  fetchQuoteOfDay: () => Promise<void>;
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (quoteId: string) => Promise<void>;
  isFavorite: (quoteId: string) => boolean;
  fetchCollections: () => Promise<void>;
  createCollection: (name: string, description?: string) => Promise<void>;
  deleteCollection: (collectionId: string) => Promise<void>;
  addToCollection: (collectionId: string, quoteId: string) => Promise<void>;
  removeFromCollection: (collectionId: string, quoteId: string) => Promise<void>;
  getCollectionQuotes: (collectionId: string) => Quote[];
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  getFilteredQuotes: () => Quote[];
  searchQuotes: (query: string) => Quote[];
}

export const useQuoteStore = create<QuoteState>((set, get) => ({
  quotes: [],
  quoteOfDay: null,
  favorites: [],
  collections: [],
  collectionQuotes: {},
  isLoading: false,
  searchQuery: '',
  selectedCategory: null,

  fetchQuotes: async () => {
    set({ isLoading: true });

    if (DEMO_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ quotes: MOCK_QUOTES, isLoading: false });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      set({ quotes: data || [], isLoading: false });
    } catch (error) {
      console.error('Error fetching quotes:', error);
      // Fallback to mock data
      set({ quotes: MOCK_QUOTES, isLoading: false });
    }
  },

  fetchQuoteOfDay: async () => {
    if (DEMO_MODE) {
      set({ quoteOfDay: getQuoteOfDay() });
      return;
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data: qotd } = await supabase
        .from('quote_of_day')
        .select('quote_id, quotes(*)')
        .eq('date', today)
        .single();

      if (qotd?.quotes) {
        set({ quoteOfDay: { ...qotd.quotes as Quote, is_quote_of_day: true } });
      } else {
        // Fallback: pick a random quote
        const { quotes } = get();
        if (quotes.length > 0) {
          const randomIndex = Math.floor(Math.random() * quotes.length);
          set({ quoteOfDay: { ...quotes[randomIndex], is_quote_of_day: true } });
        } else {
          set({ quoteOfDay: getQuoteOfDay() });
        }
      }
    } catch (error) {
      console.error('Error fetching quote of day:', error);
      set({ quoteOfDay: getQuoteOfDay() });
    }
  },

  fetchFavorites: async () => {
    if (DEMO_MODE) {
      set({ favorites: INITIAL_FAVORITES });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('favorites')
        .select('quote_id')
        .eq('user_id', user.id);

      if (error) throw error;
      
      set({ favorites: data?.map(f => f.quote_id) || [] });
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  },

  toggleFavorite: async (quoteId: string) => {
    const { favorites } = get();
    const isFav = favorites.includes(quoteId);

    if (DEMO_MODE) {
      if (isFav) {
        set({ favorites: favorites.filter(id => id !== quoteId) });
      } else {
        set({ favorites: [...favorites, quoteId] });
      }
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      if (isFav) {
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('quote_id', quoteId);
        
        set({ favorites: favorites.filter(id => id !== quoteId) });
      } else {
        await supabase
          .from('favorites')
          .insert({ user_id: user.id, quote_id: quoteId });
        
        set({ favorites: [...favorites, quoteId] });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  },

  isFavorite: (quoteId: string) => {
    return get().favorites.includes(quoteId);
  },

  fetchCollections: async () => {
    if (DEMO_MODE) {
      set({ 
        collections: INITIAL_COLLECTIONS,
        collectionQuotes: COLLECTION_QUOTES,
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('collections')
        .select(`
          *,
          collection_quotes(quote_id)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const collections = data?.map(c => ({
        ...c,
        quote_count: c.collection_quotes?.length || 0,
      })) || [];

      const collectionQuotes: { [key: string]: string[] } = {};
      data?.forEach(c => {
        collectionQuotes[c.id] = c.collection_quotes?.map((cq: any) => cq.quote_id) || [];
      });

      set({ collections, collectionQuotes });
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  },

  createCollection: async (name: string, description?: string) => {
    if (DEMO_MODE) {
      const newCollection: Collection = {
        id: `col-${Date.now()}`,
        user_id: 'demo-user-1',
        name,
        description: description || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        quote_count: 0,
      };
      set(state => ({
        collections: [newCollection, ...state.collections],
        collectionQuotes: { ...state.collectionQuotes, [newCollection.id]: [] },
      }));
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('collections')
        .insert({ user_id: user.id, name, description })
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        collections: [{ ...data, quote_count: 0 }, ...state.collections],
        collectionQuotes: { ...state.collectionQuotes, [data.id]: [] },
      }));
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  },

  deleteCollection: async (collectionId: string) => {
    if (DEMO_MODE) {
      set(state => ({
        collections: state.collections.filter(c => c.id !== collectionId),
      }));
      return;
    }

    try {
      const { error } = await supabase
        .from('collections')
        .delete()
        .eq('id', collectionId);

      if (error) throw error;

      set(state => ({
        collections: state.collections.filter(c => c.id !== collectionId),
      }));
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  },

  addToCollection: async (collectionId: string, quoteId: string) => {
    if (DEMO_MODE) {
      set(state => {
        const current = state.collectionQuotes[collectionId] || [];
        if (current.includes(quoteId)) return state;
        
        return {
          collectionQuotes: {
            ...state.collectionQuotes,
            [collectionId]: [...current, quoteId],
          },
          collections: state.collections.map(c =>
            c.id === collectionId ? { ...c, quote_count: (c.quote_count || 0) + 1 } : c
          ),
        };
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('collection_quotes')
        .insert({ collection_id: collectionId, quote_id: quoteId });

      if (error) throw error;

      set(state => {
        const current = state.collectionQuotes[collectionId] || [];
        return {
          collectionQuotes: {
            ...state.collectionQuotes,
            [collectionId]: [...current, quoteId],
          },
          collections: state.collections.map(c =>
            c.id === collectionId ? { ...c, quote_count: (c.quote_count || 0) + 1 } : c
          ),
        };
      });
    } catch (error) {
      console.error('Error adding to collection:', error);
    }
  },

  removeFromCollection: async (collectionId: string, quoteId: string) => {
    if (DEMO_MODE) {
      set(state => ({
        collectionQuotes: {
          ...state.collectionQuotes,
          [collectionId]: (state.collectionQuotes[collectionId] || []).filter(id => id !== quoteId),
        },
        collections: state.collections.map(c =>
          c.id === collectionId ? { ...c, quote_count: Math.max(0, (c.quote_count || 0) - 1) } : c
        ),
      }));
      return;
    }

    try {
      const { error } = await supabase
        .from('collection_quotes')
        .delete()
        .eq('collection_id', collectionId)
        .eq('quote_id', quoteId);

      if (error) throw error;

      set(state => ({
        collectionQuotes: {
          ...state.collectionQuotes,
          [collectionId]: (state.collectionQuotes[collectionId] || []).filter(id => id !== quoteId),
        },
        collections: state.collections.map(c =>
          c.id === collectionId ? { ...c, quote_count: Math.max(0, (c.quote_count || 0) - 1) } : c
        ),
      }));
    } catch (error) {
      console.error('Error removing from collection:', error);
    }
  },

  getCollectionQuotes: (collectionId: string) => {
    const { quotes, collectionQuotes } = get();
    const quoteIds = collectionQuotes[collectionId] || [];
    return quotes.filter(q => quoteIds.includes(q.id));
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setSelectedCategory: (category: string | null) => {
    set({ selectedCategory: category });
  },

  getFilteredQuotes: () => {
    const { quotes, selectedCategory, searchQuery } = get();
    let filtered = quotes;

    if (selectedCategory) {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        q =>
          q.text.toLowerCase().includes(query) ||
          q.author.toLowerCase().includes(query)
      );
    }

    return filtered;
  },

  searchQuotes: (query: string) => {
    const { quotes } = get();
    if (!query) return quotes;
    
    const lowerQuery = query.toLowerCase();
    return quotes.filter(
      q =>
        q.text.toLowerCase().includes(lowerQuery) ||
        q.author.toLowerCase().includes(lowerQuery) ||
        q.category.toLowerCase().includes(lowerQuery)
    );
  },
}));
