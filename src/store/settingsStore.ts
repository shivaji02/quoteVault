import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeType, FontSizeType, Colors, FontSizes } from '../constants/theme';

interface SettingsState {
  theme: ThemeType;
  fontSize: FontSizeType;
  notificationsEnabled: boolean;
  notificationTime: string;
  
  // Computed
  colors: typeof Colors.light;
  fontSizes: typeof FontSizes.medium;
  
  // Actions
  setTheme: (theme: ThemeType) => void;
  setFontSize: (fontSize: FontSizeType) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setNotificationTime: (time: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      fontSize: 'medium',
      notificationsEnabled: true,
      notificationTime: '09:00',
      
      get colors() {
        return Colors[get().theme];
      },
      
      get fontSizes() {
        return FontSizes[get().fontSize];
      },
      
      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      setNotificationTime: (time) => set({ notificationTime: time }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Hook to get computed values
export const useTheme = () => {
  const theme = useSettingsStore((state) => state.theme);
  return Colors[theme];
};

export const useFontSizes = () => {
  const fontSize = useSettingsStore((state) => state.fontSize);
  return FontSizes[fontSize];
};

