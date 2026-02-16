import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppSettings } from '../types';

interface AppContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  FAVORITES: 'rutenbuddy_favorites',
  SETTINGS: 'rutenbuddy_settings',
};

const DEFAULT_SETTINGS: AppSettings = {
  darkMode: false,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (storedSettings) {
      const parsed = JSON.parse(storedSettings);
      setSettings(parsed);
      if (parsed.darkMode) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(id)
        ? prev.filter((fav) => fav !== id)
        : [...prev, id];
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));

      if (updated.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return updated;
    });
  };

  const resetData = () => {
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    setFavorites([]);
    setSettings(DEFAULT_SETTINGS);
    document.documentElement.classList.remove('dark');
  };

  return (
    <AppContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, settings, updateSettings, resetData }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
