import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface QuranSettings {
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  fontFamily: 'uthmani' | 'arabic-traditional';
  lineHeight: number;
  isDarkMode: boolean;
  lastSurahId: number;
  favorites: number[]; // Array of verse IDs
}

const DEFAULT_SETTINGS: QuranSettings = {
  fontSize: 'medium',
  fontFamily: 'uthmani',
  lineHeight: 1.8,
  isDarkMode: false,
  lastSurahId: 1,
  favorites: [],
};

const STORAGE_KEY = 'quran_settings';

export function useQuranSettings() {
  const [settings, setSettings] = useState<QuranSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from AsyncStorage
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSettings(JSON.parse(stored));
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading settings:', error);
      setIsLoading(false);
    }
  };

  const saveSettings = async (newSettings: Partial<QuranSettings>) => {
    try {
      const updated = { ...settings, ...newSettings };
      setSettings(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const updateFontSize = (size: QuranSettings['fontSize']) => {
    saveSettings({ fontSize: size });
  };

  const updateFontFamily = (family: QuranSettings['fontFamily']) => {
    saveSettings({ fontFamily: family });
  };

  const updateLineHeight = (height: number) => {
    saveSettings({ lineHeight: height });
  };

  const toggleDarkMode = () => {
    saveSettings({ isDarkMode: !settings.isDarkMode });
  };

  const updateLastSurah = (surahId: number) => {
    saveSettings({ lastSurahId: surahId });
  };

  const addToFavorites = (verseId: number) => {
    if (!settings.favorites.includes(verseId)) {
      saveSettings({ favorites: [...settings.favorites, verseId] });
    }
  };

  const removeFromFavorites = (verseId: number) => {
    saveSettings({
      favorites: settings.favorites.filter((id) => id !== verseId),
    });
  };

  const isFavorite = (verseId: number) => {
    return settings.favorites.includes(verseId);
  };

  // Get font size in pixels
  const getFontSizePixels = (): number => {
    switch (settings.fontSize) {
      case 'small':
        return 14;
      case 'medium':
        return 18;
      case 'large':
        return 22;
      case 'xlarge':
        return 26;
      default:
        return 18;
    }
  };

  return {
    settings,
    isLoading,
    saveSettings,
    updateFontSize,
    updateFontFamily,
    updateLineHeight,
    toggleDarkMode,
    updateLastSurah,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getFontSizePixels,
  };
}
