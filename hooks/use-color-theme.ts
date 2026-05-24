import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ColorTheme {
  name: string;
  colors: {
    top: string;
    upper: string;
    middle: string;
    lower: string;
    bottom: string;
  };
}

const THEMES: Record<string, ColorTheme> = {
  theme1: {
    name: 'الأخضر والبني',
    colors: {
      top: '#7CB342',
      upper: '#A1887F',
      middle: '#D32F2F',
      lower: '#E8D5C4',
      bottom: '#FFF9C4',
    },
  },
  theme2: {
    name: 'البرتقالي والكريمي',
    colors: {
      top: '#FF9800',
      upper: '#D2691E',
      middle: '#CD5C5C',
      lower: '#F5DEB3',
      bottom: '#FFFACD',
    },
  },
  theme3: {
    name: 'البنفسجي والرمادي',
    colors: {
      top: '#D7CCC8',
      upper: '#A39F9F',
      middle: '#9C7E8F',
      lower: '#F5E6D3',
      bottom: '#FFFEF0',
    },
  },
  theme4: {
    name: 'الوردي والأخضر',
    colors: {
      top: '#FF9999',
      upper: '#E8A87C',
      middle: '#D4A5A5',
      lower: '#F5E6D3',
      bottom: '#C8E6C9',
    },
  },
};

const STORAGE_KEY = 'quran_color_theme';

export function useColorTheme() {
  const [currentTheme, setCurrentTheme] = useState<string>('theme1');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCurrentTheme(stored);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading theme:', error);
      setIsLoading(false);
    }
  };

  const setTheme = async (themeId: string) => {
    try {
      setCurrentTheme(themeId);
      await AsyncStorage.setItem(STORAGE_KEY, themeId);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const getTheme = (): ColorTheme => {
    return THEMES[currentTheme] || THEMES.theme1;
  };

  const getAllThemes = (): Record<string, ColorTheme> => {
    return THEMES;
  };

  return {
    currentTheme,
    setTheme,
    getTheme,
    getAllThemes,
    isLoading,
  };
}
