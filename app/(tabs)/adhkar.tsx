import React, { useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useAdhkar } from '@/hooks/use-adhkar';
import { useColors } from '@/hooks/use-colors';

export default function AdhkarScreen() {
  const { categories, isLoading } = useAdhkar();
  const colors = useColors();
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
  const [itemCounts, setItemCounts] = useState<{ [key: number]: number }>({});

  const toggleCategory = (categoryId: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

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

  const renderAdhkarItem = (item: any) => {
    const currentCount = itemCounts[item.id] ?? item.count;
    const isCompleted = currentCount === 0;

    return (
      <View
        key={item.id}
        className="p-4 mb-3 rounded-xl"
        style={{
          backgroundColor: isCompleted ? colors.success : colors.surface,
          borderWidth: 1,
          borderColor: isCompleted ? colors.success : colors.border,
          opacity: isCompleted ? 0.8 : 1,
        }}
      >
        <Text
          className="text-right mb-3 leading-relaxed"
          style={{
            fontSize: 16,
            lineHeight: 28,
            color: isCompleted ? colors.background : colors.foreground,
          }}
        >
          {item.text}
        </Text>

        <View className="flex-row items-center justify-between mt-3 gap-2">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => handleCounterDecrement(item.id, item.count)}
              className="px-3 py-2 rounded-lg items-center justify-center"
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
                className="font-bold text-xs"
                style={{ color: colors.background }}
              >
                إعادة
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            className="text-xs font-semibold"
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

  const renderCategory = (category: any) => {
    const isExpanded = expandedCategories.has(category.id);

    return (
      <View key={category.id} className="mb-4">
        {/* Category Header */}
        <TouchableOpacity
          onPress={() => toggleCategory(category.id)}
          className="px-4 py-3 rounded-xl flex-row items-center justify-between"
          style={{
            backgroundColor: colors.primary,
            shadowColor: colors.foreground,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Text
            className="text-lg font-bold"
            style={{ color: colors.background }}
          >
            {category.name}
          </Text>
          <Text
            className="text-2xl"
            style={{ color: colors.background }}
          >
            {isExpanded ? '▼' : '▶'}
          </Text>
        </TouchableOpacity>

        {/* Category Items */}
        {isExpanded && (
          <View className="mt-3 pl-2">
            {category.items.map((item: any) => renderAdhkarItem(item))}
          </View>
        )}
      </View>
    );
  };

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-lg" style={{ color: colors.foreground }}>
          جاري تحميل الأذكار...
        </Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text
          className="text-3xl font-bold mb-2 text-right"
          style={{ color: colors.primary }}
        >
          الأذكار والأدعية
        </Text>
        <Text
          className="text-sm text-right mb-6"
          style={{ color: colors.muted }}
        >
          {categories.length} فئات • استمع وكرر
        </Text>

        {/* Categories */}
        {categories.map((category) => renderCategory(category))}

        <View className="h-4" />
      </ScrollView>
    </ScreenContainer>
  );
}
