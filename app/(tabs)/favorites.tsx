import React, { useMemo } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useQuran } from '@/hooks/use-quran';
import { useQuranSettings } from '@/hooks/use-quran-settings';
import { useColors } from '@/hooks/use-colors';

interface FavoriteVerse {
  verseId: number;
  surahId: number;
  surahName: string;
  verseText: string;
}

export default function FavoritesScreen() {
  const { surahs } = useQuran();
  const { settings, removeFromFavorites, getFontSizePixels } = useQuranSettings();
  const colors = useColors();

  const favoriteVerses = useMemo(() => {
    const verses: FavoriteVerse[] = [];

    settings.favorites.forEach((verseId) => {
      // Find which surah this verse belongs to
      let currentVerseCount = 0;
      for (const surah of surahs) {
        const surahVerseCount = surah.total_verses;
        if (verseId <= currentVerseCount + surahVerseCount) {
          const verseIndex = verseId - currentVerseCount - 1;
          if (verseIndex >= 0 && verseIndex < surah.verses.length) {
            verses.push({
              verseId,
              surahId: surah.id,
              surahName: surah.name,
              verseText: surah.verses[verseIndex].text,
            });
          }
          break;
        }
        currentVerseCount += surahVerseCount;
      }
    });

    return verses;
  }, [settings.favorites, surahs]);

  const renderFavoriteItem = ({ item }: { item: FavoriteVerse }) => (
    <View
      className="p-4 mb-3 rounded-lg flex-row justify-between items-start"
      style={{ backgroundColor: colors.surface }}
    >
      <View className="flex-1 mr-3">
        <Text
          className="text-sm font-semibold mb-2"
          style={{ color: colors.primary }}
        >
          {item.surahName} - الآية {item.verseId}
        </Text>
        <Text
          className="text-right"
          style={{
            fontSize: getFontSizePixels() - 2,
            lineHeight: (getFontSizePixels() - 2) * 1.8,
            color: colors.foreground,
          }}
        >
          {item.verseText}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => removeFromFavorites(item.verseId)}
        className="ml-2"
      >
        <Text
          className="text-lg font-bold"
          style={{ color: colors.warning }}
        >
          ★
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenContainer className="p-4">
      <Text className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
        المفضلة
      </Text>
      <Text
        className="text-sm mb-4"
        style={{ color: colors.muted }}
      >
        {favoriteVerses.length} آية مفضلة
      </Text>

      {favoriteVerses.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text
            className="text-lg"
            style={{ color: colors.muted }}
          >
            لا توجد آيات مفضلة حتى الآن
          </Text>
          <Text
            className="text-sm mt-2 text-center"
            style={{ color: colors.muted }}
          >
            اضغط على ★ في شاشة القراءة لإضافة آية إلى المفضلة
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteVerses}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.verseId.toString()}
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
        />
      )}
    </ScreenContainer>
  );
}
