import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeContext } from '@/lib/theme-provider';

export interface ColorTheme {
  name: string;
  colors: {
    top: string;
    upper: string;
    middle: string;
    lower: string;
    bottom: string;
  };
  lightColors: {
    primary: string;
    background: string;
    surface: string;
    foreground: string;
    muted: string;
    border: string;
  };
  darkColors: {
    primary: string;
    background: string;
    surface: string;
    foreground: string;
    muted: string;
    border: string;
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
    lightColors: {
      primary: '#2D8659',
      background: '#F5F1ED',
      surface: '#F0E8E0',
      foreground: '#3E2723',
      muted: '#8D6E63',
      border: '#D7CCC8',
    },
    darkColors: {
      primary: '#4CAF7F',
      background: '#1A1410',
      surface: '#2A1F18',
      foreground: '#F5E6D3',
      muted: '#A1887F',
      border: '#3E2723',
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
    lightColors: {
      primary: '#E65100',
      background: '#FFF8F0',
      surface: '#FFE8D6',
      foreground: '#3E2723',
      muted: '#A1887F',
      border: '#FFCCB2',
    },
    darkColors: {
      primary: '#FF9800',
      background: '#1A1410',
      surface: '#2A1F18',
      foreground: '#FFE8D6',
      muted: '#D2691E',
      border: '#3E2723',
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
    lightColors: {
      primary: '#7B68A6',
      background: '#F5F1ED',
      surface: '#F0E8E0',
      foreground: '#3E2723',
      muted: '#8D6E63',
      border: '#D7CCC8',
    },
    darkColors: {
      primary: '#9C7E8F',
      background: '#1A1410',
      surface: '#2A1F18',
      foreground: '#F5E6D3',
      muted: '#A1887F',
      border: '#3E2723',
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
    lightColors: {
      primary: '#E91E63',
      background: '#FFF5F7',
      surface: '#FFE8ED',
      foreground: '#3E2723',
      muted: '#8D6E63',
      border: '#F8BBD0',
    },
    darkColors: {
      primary: '#FF9999',
      background: '#1A1410',
      surface: '#2A1F18',
      foreground: '#F5E6D3',
      muted: '#E8A87C',
      border: '#3E2723',
    },
  },
};

const STORAGE_KEY = 'quran_color_theme';

export interface UseColorThemeReturn {
  currentTheme: string;
  setTheme: (themeId: string) => Promise<void>;
  getTheme: () => ColorTheme;
  getAllThemes: () => Array<ColorTheme & { id: string }>;
  isLoading: boolean;
  THEMES: Record<string, ColorTheme>;
}

export function useColorTheme(): UseColorThemeReturn {
  const [currentTheme, setCurrentTheme] = useState<string>('theme1');
  const [isLoading, setIsLoading] = useState(true);
  const themeContext = useThemeContext();

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCurrentTheme(stored);
        applyThemeColors(stored);
      } else {
        applyThemeColors('theme1');
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading theme:', error);
      setIsLoading(false);
    }
  };

  const applyThemeColors = (themeId: string) => {
    const theme = THEMES[themeId];
    if (!theme) return;

    // تطبيق الألوان على نظام الثيم
    const isDark = themeContext.colorScheme === 'dark';
    const colors = isDark ? theme.darkColors : theme.lightColors;

    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      Object.entries(colors).forEach(([token, value]) => {
        root.style.setProperty(`--color-${token}`, value);
      });
    }
  };

  const setTheme = async (themeId: string) => {
    try {
      setCurrentTheme(themeId);
      applyThemeColors(themeId);
      await AsyncStorage.setItem(STORAGE_KEY, themeId);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const getTheme = (): ColorTheme => {
    return THEMES[currentTheme] || THEMES.theme1;
  };

  const getAllThemes = (): Array<ColorTheme & { id: string }> => {
    return Object.entries(THEMES).map(([id, theme]) => ({
      ...theme,
      id,
    }));
  };

  // إعادة تطبيق الألوان عند تغيير الوضع الليلي
  useEffect(() => {
    applyThemeColors(currentTheme);
  }, [themeContext.colorScheme]);

  return {
    currentTheme,
    setTheme,
    getTheme,
    getAllThemes,
    isLoading,
    THEMES,
  };
}


