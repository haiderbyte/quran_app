import React, { useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useAdhkar } from '@/hooks/use-adhkar';
import { useColors } from '@/hooks/use-colors';

export default function AdhkarScreen() {
  const { categories, isLoading } = useAdhkar();
  const colors = useColors();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [itemCounts, setItemCounts] = useState<{ [key: number]: number }>({});

  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);

  const handleCounterDecrement = (itemId: number, initialCount: number) => {
    const currentCount = itemCounts[itemId] ?? initialCount;
    if (currentCount > 0) {
      setItemCounts((prev) => ({
        ...prev,
        [itemId]: currentCount - 1,
      }));
    }
  };

  const handleCounterReset = (itemId: number) => {
    setItemCounts((prev) => ({
      ...prev,
      [itemId]: 0,
    }));
  };

  const renderCategoryButton = ({ item }: { item: any }) => {
    const isSelected = item.id === selectedCategoryId;
    return (
      <TouchableOpacity
        onPress={() => setSelectedCategoryId(item.id)}
        className="mr-2 mb-2 px-4 py-2 rounded-full"
        style={{
          backgroundColor: isSelected ? colors.primary : colors.surface,
          borderWidth: isSelected ? 0 : 1,
          borderColor: colors.border,
        }}
      >
        <Text
          className="font-semibold text-sm"
          style={{
            color: isSelected ? colors.background : colors.foreground,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderAdhkarItem = ({ item }: { item: any }) => {
    const currentCount = itemCounts[item.id] ?? item.count;
    const isCompleted = currentCount === 0;

    return (
      <View
        className="p-4 mb-3 rounded-lg"
        style={{
          backgroundColor: isCompleted ? colors.success : colors.surface,
          opacity: isCompleted ? 0.7 : 1,
        }}
      >
        <Text
          className="text-right mb-3"
          style={{
            fontSize: 16,
            lineHeight: 24,
            color: isCompleted ? colors.background : colors.foreground,
          }}
        >
          {item.text}
        </Text>

        <View className="flex-row items-center justify-between mt-3">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => handleCounterDecrement(item.id, item.count)}
              className="px-3 py-2 rounded-lg"
              style={{ backgroundColor: colors.primary }}
            >
              <Text
                className="font-bold text-lg"
                style={{ color: colors.background }}
              >
                −
              </Text>
            </TouchableOpacity>

            <View
              className="px-4 py-2 rounded-lg items-center justify-center"
              style={{ backgroundColor: colors.border, minWidth: 60 }}
            >
              <Text
                className="font-bold text-lg"
                style={{ color: colors.foreground }}
              >
                {currentCount}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => handleCounterReset(item.id)}
              className="px-3 py-2 rounded-lg"
              style={{ backgroundColor: colors.warning }}
            >
              <Text
                className="font-bold text-sm"
                style={{ color: colors.background }}
              >
                إعادة تعيين
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            className="text-sm font-semibold"
            style={{
              color: isCompleted ? colors.background : colors.primary,
            }}
          >
            {isCompleted ? '✓ تم' : `المتبقي: ${currentCount}`}
          </Text>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-lg text-foreground">جاري تحميل الأذكار...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <Text className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
        الأذكار والأدعية
      </Text>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        <FlatList
          data={categories}
          renderItem={renderCategoryButton}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          numColumns={categories.length}
        />
      </ScrollView>

      {/* Adhkar Items */}
      {selectedCategory ? (
        <FlatList
          data={selectedCategory.items}
          renderItem={renderAdhkarItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text
            className="text-lg text-center"
            style={{ color: colors.muted }}
          >
            اختر فئة من الأذكار لبدء العد
          </Text>
        </View>
      )}
    </ScreenContainer>
  );
}
