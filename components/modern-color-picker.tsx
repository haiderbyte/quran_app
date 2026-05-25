import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useColorTheme } from '@/hooks/use-color-theme';
import { useColors } from '@/hooks/use-colors';
import { cn } from '@/lib/utils';

export function ModernColorPicker() {
  const { currentTheme, setTheme, getAllThemes } = useColorTheme();
  const colors = useColors();
  const themes = getAllThemes();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View className="w-full">
      {/* Color Picker Header */}
      <TouchableOpacity
        onPress={() => setIsExpanded(!isExpanded)}
        className="px-4 py-3 rounded-xl flex-row items-center justify-between"
        style={{
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text
          className="text-base font-semibold"
          style={{ color: colors.foreground }}
        >
          سمات الألوان
        </Text>
        <Text
          className="text-xl"
          style={{ color: colors.primary }}
        >
          {isExpanded ? '▼' : '▶'}
        </Text>
      </TouchableOpacity>

      {/* Color Themes Grid */}
      {isExpanded && (
        <View className="mt-3 gap-2">
          {themes.map((theme: any) => (
            <TouchableOpacity
              key={theme.id}
              onPress={() => {
                setTheme(theme.id);
                setIsExpanded(false);
              }}
              className={cn(
                'p-4 rounded-xl flex-row items-center gap-3 border-2',
                currentTheme === theme.id
                  ? 'border-primary'
                  : 'border-border'
              )}
              style={{
                backgroundColor: colors.surface,
              }}
            >
              {/* Color Gradient Preview */}
              <View className="flex-row gap-1 flex-1">
                {Object.values(theme.colors).map((color: any, idx: number) => (
                  <View
                    key={idx}
                    className="flex-1 h-10 rounded-lg"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </View>

              {/* Theme Name & Selection Indicator */}
              <View className="items-end">
                <Text
                  className="text-sm font-semibold"
                  style={{ color: colors.foreground }}
                >
                  {theme.name}
                </Text>
                {currentTheme === theme.id && (
                  <Text
                    className="text-xs font-bold mt-1"
                    style={{ color: colors.primary }}
                  >
                    ✓ مختار
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
