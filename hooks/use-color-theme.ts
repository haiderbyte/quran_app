import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeContext } from '@/lib/theme-provider';

export interface ColorTheme {
  id: string;
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
  forest: {
    id: 'forest',
    name: 'الأخضر الغابة',
    colors: {
      top: '#2D6A4F',
      upper: '#40916C',
      middle: '#52B788',
      lower: '#74C69D',
      bottom: '#B7E4C7',
    },
  },
  warm: {
    id: 'warm',
    name: 'البني الدافئ',
    colors: {
      top: '#8B6F47',
      upper: '#A0826D',
      middle: '#C9A876',
      lower: '#D4B896',
      bottom: '#E8D4B8',
    },
  },
  sunset: {
    id: 'sunset',
    name: 'الغروب',
    colors: {
      top: '#D4A574',
      upper: '#E8A76F',
      middle: '#F4A460',
      lower: '#FFB88C',
      bottom: '#FFD4A3',
    },
  },
  ocean: {
    id: 'ocean',
    name: 'المحيط',
    colors: {
      top: '#1B4965',
      upper: '#2E7D8F',
      middle: '#408E9C',
      lower: '#6BA3B8',
      bottom: '#A8D8EA',
    },
  },
};

const STORAGE_KEY = 'quran_color_theme';

export function useColorTheme() {
  const [currentTheme, setCurrentThemeState] = useState<string>('forest');
  const [isLoading, setIsLoading] = useState(true);
  const themeContext = useThemeContext();

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored && THEMES[stored]) {
        setCurrentThemeState(stored);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading theme:', error);
      setIsLoading(false);
    }
  };

  const setTheme = async (themeId: string) => {
    if (!THEMES[themeId]) return;
    
    try {
      setCurrentThemeState(themeId);
      await AsyncStorage.setItem(STORAGE_KEY, themeId);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const getTheme = (): ColorTheme => {
    return THEMES[currentTheme] || THEMES.forest;
  };

  const getAllThemes = (): ColorTheme[] => {
    return Object.values(THEMES);
  };

  return {
    currentTheme,
    setTheme,
    getTheme,
    getAllThemes,
    isLoading,
  };
}
