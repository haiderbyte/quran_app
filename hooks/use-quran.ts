import { useEffect, useState } from 'react';
import quranData from '@/constants/quran-data.json';

export interface Verse {
  id: number;
  text: string;
}

export interface Surah {
  id: number;
  name: string;
  transliteration: string;
  type: string;
  total_verses: number;
  verses: Verse[];
}

export interface QuranContextType {
  surahs: Surah[];
  currentSurah: Surah | null;
  setSurahId: (id: number) => void;
  searchSurahs: (query: string) => Surah[];
  isLoading: boolean;
}

export function useQuran(): QuranContextType {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [currentSurah, setCurrentSurah] = useState<Surah | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load Quran data
    try {
      setSurahs(quranData as Surah[]);
      if (quranData.length > 0) {
        setCurrentSurah((quranData as Surah[])[0]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading Quran data:', error);
      setIsLoading(false);
    }
  }, []);

  const setSurahId = (id: number) => {
    const surah = surahs.find((s) => s.id === id);
    if (surah) {
      setCurrentSurah(surah);
    }
  };

  const searchSurahs = (query: string): Surah[] => {
    if (!query.trim()) {
      return surahs;
    }

    const lowerQuery = query.toLowerCase();
    return surahs.filter(
      (surah) =>
        surah.name.includes(query) ||
        surah.transliteration.toLowerCase().includes(lowerQuery)
    );
  };

  return {
    surahs,
    currentSurah,
    setSurahId,
    searchSurahs,
    isLoading,
  };
}
