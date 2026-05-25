import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { cn } from '@/lib/utils';

interface ModernSurahCardProps {
  number: number;
  name: string;
  englishName: string;
  versesCount: number;
  onPress: () => void;
  isSelected?: boolean;
}

export function ModernSurahCard({
  number,
  name,
  englishName,
  versesCount,
  onPress,
  isSelected = false,
}: ModernSurahCardProps) {
  const colors = useColors();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="mb-3 rounded-2xl overflow-hidden"
      style={{
        backgroundColor: colors.surface,
        borderWidth: isSelected ? 2 : 1,
        borderColor: isSelected ? colors.primary : colors.border,
        shadowColor: colors.foreground,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isSelected ? 0.15 : 0.05,
        shadowRadius: 8,
        elevation: isSelected ? 4 : 1,
      }}
    >
      <View className="flex-row items-center justify-between p-4">
        {/* Surah Number Circle */}
        <View
          className="w-12 h-12 rounded-full items-center justify-center"
          style={{
            backgroundColor: isSelected ? colors.primary : colors.border,
          }}
        >
          <Text
            className="font-bold text-sm"
            style={{
              color: isSelected ? colors.background : colors.foreground,
            }}
          >
            {number}
          </Text>
        </View>

        {/* Surah Info */}
        <View className="flex-1 mx-4">
          <Text
            className="text-lg font-bold text-right"
            style={{ color: colors.foreground }}
          >
            {name}
          </Text>
          <Text
            className="text-xs text-right mt-1"
            style={{ color: colors.muted }}
          >
            {englishName} • {versesCount} آية
          </Text>
        </View>

        {/* Arrow Indicator */}
        <Text
          className="text-xl"
          style={{ color: colors.primary }}
        >
          ›
        </Text>
      </View>

      {/* Bottom Accent Line */}
      {isSelected && (
        <View
          className="h-1"
          style={{ backgroundColor: colors.primary }}
        />
      )}
    </TouchableOpacity>
  );
}
