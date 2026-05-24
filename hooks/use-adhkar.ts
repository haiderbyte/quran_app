import { useEffect, useState } from 'react';
import adhkarData from '@/constants/adhkar-dua.json';

export interface AdhkarItem {
  id: number;
  text: string;
  count: number;
}

export interface AdhkarCategory {
  id: number;
  name: string;
  icon: string;
  items: AdhkarItem[];
}

export function useAdhkar() {
  const [categories, setCategories] = useState<AdhkarCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      setCategories(adhkarData.categories);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading adhkar data:', error);
      setIsLoading(false);
    }
  }, []);

  const getCategory = (id: number): AdhkarCategory | undefined => {
    return categories.find((cat) => cat.id === id);
  };

  const getAllItems = (): AdhkarItem[] => {
    return categories.flatMap((cat) => cat.items);
  };

  return {
    categories,
    isLoading,
    getCategory,
    getAllItems,
  };
}
