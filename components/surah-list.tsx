import React from 'react';
import { FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { Surah } from '@/hooks/use-quran';

interface SurahListProps {
  surahs: Surah[];
  onSelectSurah: (surah: Surah) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentSurahId?: number;
}

export function SurahList({
  surahs,
  onSelectSurah,
  searchQuery,
  onSearchChange,
  currentSurahId,
}: SurahListProps) {
  const colors = useColors();

  const renderSurahItem = ({ item }: { item: Surah }) => {
    const isSelected = item.id === currentSurahId;

    return (
      <TouchableOpacity
        onPress={() => onSelectSurah(item)}
        style={{
          backgroundColor: isSelected ? colors.primary : colors.surface,
          borderLeftWidth: isSelected ? 4 : 0,
          borderLeftColor: isSelected ? colors.primary : 'transparent',
        }}
        className="px-4 py-4 mb-2 rounded-lg flex-row justify-between items-center"
      >
        <View className="flex-1">
          <Text
            className="text-lg font-semibold"
            style={{ color: isSelected ? colors.background : colors.foreground }}
          >
            {item.name}
          </Text>
          <Text
            className="text-sm mt-1"
            style={{ color: isSelected ? colors.background : colors.muted }}
          >
            {item.transliteration} • {item.total_verses} آيات
          </Text>
        </View>
        <View
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{
            backgroundColor: isSelected ? colors.background : colors.border,
          }}
        >
          <Text
            className="text-sm font-bold"
            style={{ color: isSelected ? colors.primary : colors.foreground }}
          >
            {item.id}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1">
      {/* Search Bar */}
      <View className="mb-4">
        <TextInput
          placeholder="ابحث عن سورة..."
          placeholderTextColor={colors.muted}
          value={searchQuery}
          onChangeText={onSearchChange}
          className="px-4 py-3 rounded-lg mb-2"
          style={{
            backgroundColor: colors.surface,
            color: colors.foreground,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        />
      </View>

      {/* Surahs List */}
      <FlatList
        data={surahs}
        renderItem={renderSurahItem}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}
