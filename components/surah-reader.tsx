import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { Surah } from '@/hooks/use-quran';

interface SurahReaderProps {
  surah: Surah;
  fontSize: number;
  lineHeight: number;
  onFavoriteToggle: (verseId: number) => void;
  isFavorite: (verseId: number) => boolean;
  onNavigatePrevious?: () => void;
  onNavigateNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export function SurahReader({
  surah,
  fontSize,
  lineHeight,
  onFavoriteToggle,
  isFavorite,
  onNavigatePrevious,
  onNavigateNext,
  hasPrevious = true,
  hasNext = true,
}: SurahReaderProps) {
  const colors = useColors();

  return (
    <View className="flex-1">
      {/* Header */}
      <View
        className="px-4 py-4 border-b"
        style={{ borderBottomColor: colors.border }}
      >
        <Text
          className="text-2xl font-bold text-center"
          style={{ color: colors.primary }}
        >
          {surah.name}
        </Text>
        <Text
          className="text-sm text-center mt-2"
          style={{ color: colors.muted }}
        >
          {surah.transliteration} • {surah.total_verses} آيات
        </Text>
      </View>

      {/* Quran Text */}
      <ScrollView className="flex-1 px-4 py-4">
        {surah.verses.map((verse) => (
          <View key={verse.id} className="mb-6">
            {/* Verse Number */}
            <View className="flex-row items-center mb-2">
              <View
                className="w-8 h-8 rounded-full items-center justify-center mr-2"
                style={{ backgroundColor: colors.primary }}
              >
                <Text
                  className="text-xs font-bold"
                  style={{ color: colors.background }}
                >
                  {verse.id}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => onFavoriteToggle(verse.id)}
                className="ml-auto"
              >
                <Text
                  className="text-lg"
                  style={{
                    color: isFavorite(verse.id)
                      ? colors.warning
                      : colors.muted,
                  }}
                >
                  {isFavorite(verse.id) ? '★' : '☆'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Verse Text */}
            <Text
              className="text-right"
              style={{
                fontSize,
                lineHeight: fontSize * (lineHeight || 1.8),
                color: colors.foreground,
                fontFamily: 'System',
              }}
            >
              {verse.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Navigation Buttons */}
      <View
        className="flex-row justify-between px-4 py-4 border-t"
        style={{ borderTopColor: colors.border }}
      >
        <TouchableOpacity
          onPress={onNavigatePrevious}
          disabled={!hasPrevious}
          className="flex-1 py-3 rounded-lg mr-2 items-center"
          style={{
            backgroundColor: hasPrevious ? colors.primary : colors.surface,
            opacity: hasPrevious ? 1 : 0.5,
          }}
        >
          <Text
            className="font-semibold"
            style={{
              color: hasPrevious ? colors.background : colors.muted,
            }}
          >
            السورة السابقة
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNavigateNext}
          disabled={!hasNext}
          className="flex-1 py-3 rounded-lg ml-2 items-center"
          style={{
            backgroundColor: hasNext ? colors.primary : colors.surface,
            opacity: hasNext ? 1 : 0.5,
          }}
        >
          <Text
            className="font-semibold"
            style={{
              color: hasNext ? colors.background : colors.muted,
            }}
          >
            السورة التالية
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
