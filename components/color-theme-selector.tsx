import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { useColorTheme } from '@/hooks/use-color-theme';

export function ColorThemeSelector() {
  const colors = useColors();
  const { currentTheme, setTheme, getAllThemes } = useColorTheme();
  const themes = getAllThemes();

  return (
    <View className="gap-3">
      {Object.entries(themes).map(([themeId, theme]) => (
        <TouchableOpacity
          key={themeId}
          onPress={() => setTheme(themeId)}
          className="rounded-lg overflow-hidden border-2"
          style={{
            borderColor: currentTheme === themeId ? colors.primary : colors.border,
            borderWidth: currentTheme === themeId ? 3 : 1,
          }}
        >
          <View className="flex-row h-16">
            <View
              className="flex-1"
              style={{ backgroundColor: theme.colors.top }}
            />
            <View
              className="flex-1"
              style={{ backgroundColor: theme.colors.upper }}
            />
            <View
              className="flex-1"
              style={{ backgroundColor: theme.colors.middle }}
            />
            <View
              className="flex-1"
              style={{ backgroundColor: theme.colors.lower }}
            />
            <View
              className="flex-1"
              style={{ backgroundColor: theme.colors.bottom }}
            />
          </View>
          <View
            className="px-3 py-2"
            style={{ backgroundColor: colors.surface }}
          >
            <View className="flex-row items-center justify-between">
              <Text
                className="font-semibold"
                style={{ color: colors.foreground }}
              >
                {theme.name}
              </Text>
              {currentTheme === themeId && (
                <Text
                  className="text-lg"
                  style={{ color: colors.primary }}
                >
                  ✓
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
