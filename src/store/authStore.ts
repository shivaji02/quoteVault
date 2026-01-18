import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../services/supabase';
import { DEMO_USER } from '../services/mockData';
import type { User } from '../types';

// Set to false to use Supabase, true for demo mode
const DEMO_MODE = true;

interface AuthState {
  user: User | null;
  session: any | null;
  isLoading: boolean;
  isInitialized: boolean;
  
  // Actions
  initialize: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updateProfile: (updates: Partial<User>) => Promise<{ error?: string }>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoading: false,
      isInitialized: false,

      initialize: async () => {
        console.log('Initializing auth...');
        // Just mark as initialized - the persist middleware will restore user
        set({ isInitialized: true, isLoading: false });
        console.log('Auth initialized, user:', get().user?.email);
      },

      signUp: async (email, password, name) => {
        set({ isLoading: true });
        console.log('SignUp attempt:', email);
        
        if (DEMO_MODE) {
          await new Promise(resolve => setTimeout(resolve, 500));
          const newUser: User = {
            ...DEMO_USER,
            id: `user-${Date.now()}`,
            email,
            display_name: name,
            created_at: new Date().toISOString(),
          };
          console.log('Demo user created:', newUser.email);
          set({ user: newUser, session: { user: newUser }, isLoading: false });
          return {};
        }

        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { display_name: name },
            },
          });

          if (error) {
            set({ isLoading: false });
            return { error: error.message };
          }

          if (data.user) {
            const { data: profile } = await supabase
              .from('users')
              .select('*')
              .eq('id', data.user.id)
              .single();
            
            set({ user: profile || data.user, session: data.session, isLoading: false });
          }
          
          return {};
        } catch (error: any) {
          set({ isLoading: false });
          return { error: error.message || 'Sign up failed' };
        }
      },

      signIn: async (email, password) => {
        set({ isLoading: true });
        console.log('SignIn attempt:', email);
        
        if (DEMO_MODE) {
          await new Promise(resolve => setTimeout(resolve, 500));
          const demoUser: User = {
            ...DEMO_USER,
            email: email || DEMO_USER.email,
            display_name: email.split('@')[0] || 'Quote Lover',
          };
          console.log('Demo login successful:', demoUser.email);
          set({ user: demoUser, session: { user: demoUser }, isLoading: false });
          return {};
        }

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            set({ isLoading: false });
            return { error: error.message };
          }

          if (data.user) {
            const { data: profile } = await supabase
              .from('users')
              .select('*')
              .eq('id', data.user.id)
              .single();
            
            set({ user: profile || data.user, session: data.session, isLoading: false });
          }
          
          return {};
        } catch (error: any) {
          set({ isLoading: false });
          return { error: error.message || 'Sign in failed' };
        }
      },

      signOut: async () => {
        set({ isLoading: true });
        console.log('Signing out...');
        
        if (!DEMO_MODE) {
          try {
            await supabase.auth.signOut();
          } catch (error) {
            console.error('Sign out error:', error);
          }
        }
        
        set({ user: null, session: null, isLoading: false });
      },

      resetPassword: async (email) => {
        set({ isLoading: true });
        
        if (DEMO_MODE) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          set({ isLoading: false });
          return {};
        }

        try {
          const { error } = await supabase.auth.resetPasswordForEmail(email);
          set({ isLoading: false });
          if (error) return { error: error.message };
          return {};
        } catch (error: any) {
          set({ isLoading: false });
          return { error: error.message || 'Reset failed' };
        }
      },

      updateProfile: async (updates) => {
        const { user } = get();
        if (!user) return { error: 'Not authenticated' };

        if (DEMO_MODE) {
          await new Promise(resolve => setTimeout(resolve, 500));
          set({ user: { ...user, ...updates } });
          return {};
        }

        try {
          const { error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', user.id);

          if (error) return { error: error.message };
          
          set({ user: { ...user, ...updates } });
          return {};
        } catch (error: any) {
          return { error: error.message || 'Update failed' };
        }
      },

      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        console.log('Auth rehydrated, user:', state?.user?.email);
        // Mark as initialized after rehydration
        if (state) {
          state.isInitialized = true;
        }
      },
    }
  )
);
