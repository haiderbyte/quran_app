import React, { useState, useMemo } from 'react';
import { FlatList, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useQuran, type Surah } from '@/hooks/use-quran';
import { useColors } from '@/hooks/use-colors';
import { ModernSurahCard } from '@/components/modern-surah-card';

export default function HomeScreen() {
  const router = useRouter();
  const { surahs, isLoading } = useQuran();
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);

  const filteredSurahs = useMemo(() => {
    if (!searchQuery.trim()) return surahs;
    const query = searchQuery.toLowerCase();
    return surahs.filter(
      (surah) =>
        surah.name.includes(query) ||
        surah.transliteration.toLowerCase().includes(query)
    );
  }, [surahs, searchQuery]);

  const handleSurahPress = (surahId: number) => {
    setSelectedSurah(surahId);
    // Navigate to surah detail screen
    // router.push({ pathname: '/surah/[id]', params: { id: surahId } });
  };

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-lg" style={{ color: colors.foreground }}>
          جاري تحميل السور...
        </Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      {/* Header */}
      <View className="mb-6">
        <Text
          className="text-4xl font-bold mb-2 text-right"
          style={{ color: colors.primary }}
        >
          القرآن الكريم
        </Text>
        <Text
          className="text-sm text-right"
          style={{ color: colors.muted }}
        >
          {surahs.length} سورة • 6236 آية
        </Text>
      </View>

      {/* Search Bar */}
      <View
        className="mb-6 px-4 py-3 rounded-xl flex-row items-center gap-3"
        style={{
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text style={{ color: colors.muted }}>🔍</Text>
        <TextInput
          placeholder="ابحث عن سورة..."
          placeholderTextColor={colors.muted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="flex-1 text-right"
          style={{
            color: colors.foreground,
            fontSize: 16,
          }}
        />
      </View>

      {/* Surahs List */}
      <FlatList
        data={filteredSurahs}
        keyExtractor={(item: Surah) => item.id.toString()}
        scrollEnabled={false}
        renderItem={({ item }: { item: Surah }) => (
          <ModernSurahCard
            number={item.id}
            name={item.name}
            englishName={item.transliteration}
            versesCount={item.total_verses}
            onPress={() => handleSurahPress(item.id)}
            isSelected={selectedSurah === item.id}
          />
        )}
        ListEmptyComponent={
          <View className="items-center justify-center py-8">
            <Text style={{ color: colors.muted }}>
              لم يتم العثور على سور
            </Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}
