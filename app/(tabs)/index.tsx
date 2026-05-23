import { useState } from 'react';
import { View, Text } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { SurahList } from '@/components/surah-list';
import { SurahReader } from '@/components/surah-reader';
import { useQuran } from '@/hooks/use-quran';
import { useQuranSettings } from '@/hooks/use-quran-settings';
import { useColors } from '@/hooks/use-colors';

export default function HomeScreen() {
  const { surahs, currentSurah, setSurahId, searchSurahs, isLoading } = useQuran();
  const {
    settings,
    getFontSizePixels,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    updateLastSurah,
  } = useQuranSettings();
  const colors = useColors();

  const [searchQuery, setSearchQuery] = useState('');
  const [isReading, setIsReading] = useState(false);

  const filteredSurahs = searchQuery.trim() ? searchSurahs(searchQuery) : surahs;

  const handleSelectSurah = (surah: any) => {
    setSurahId(surah.id);
    updateLastSurah(surah.id);
    setIsReading(true);
  };

  const handleFavoriteToggle = (verseId: number) => {
    if (isFavorite(verseId)) {
      removeFromFavorites(verseId);
    } else {
      addToFavorites(verseId);
    }
  };

  const handleNavigatePrevious = () => {
    if (currentSurah && currentSurah.id > 1) {
      const previousSurah = surahs.find((s) => s.id === currentSurah.id - 1);
      if (previousSurah) {
        setSurahId(previousSurah.id);
        updateLastSurah(previousSurah.id);
      }
    }
  };

  const handleNavigateNext = () => {
    if (currentSurah && currentSurah.id < 114) {
      const nextSurah = surahs.find((s) => s.id === currentSurah.id + 1);
      if (nextSurah) {
        setSurahId(nextSurah.id);
        updateLastSurah(nextSurah.id);
      }
    }
  };

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-lg text-foreground">جاري تحميل القرآن الكريم...</Text>
      </ScreenContainer>
    );
  }

  if (isReading && currentSurah) {
    return (
      <ScreenContainer>
        <SurahReader
          surah={currentSurah}
          fontSize={getFontSizePixels()}
          lineHeight={settings.lineHeight}
          onFavoriteToggle={handleFavoriteToggle}
          isFavorite={isFavorite}
          onNavigatePrevious={handleNavigatePrevious}
          onNavigateNext={handleNavigateNext}
          hasPrevious={currentSurah.id > 1}
          hasNext={currentSurah.id < 114}
        />
        <View className="absolute top-0 left-4 right-4 pt-4">
          <Text
            onPress={() => setIsReading(false)}
            className="text-primary font-semibold"
            style={{ color: colors.primary }}
          >
            ← العودة
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <View className="mb-4">
        <Text className="text-3xl font-bold text-primary mb-2" style={{ color: colors.primary }}>
          القرآن الكريم
        </Text>
        <Text className="text-sm text-muted" style={{ color: colors.muted }}>
          {surahs.length} سورة • {surahs.reduce((sum, s) => sum + s.total_verses, 0)} آية
        </Text>
      </View>

      <SurahList
        surahs={filteredSurahs}
        onSelectSurah={handleSelectSurah}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentSurahId={currentSurah?.id}
      />
    </ScreenContainer>
  );
}
