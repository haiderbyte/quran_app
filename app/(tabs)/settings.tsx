import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Switch } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { useThemeContext } from '@/lib/theme-provider';
import { useQuranSettings } from '@/hooks/use-quran-settings';
import { ModernColorPicker } from '@/components/modern-color-picker';

export default function SettingsScreen() {
  const colors = useColors();
  const { colorScheme, setColorScheme } = useThemeContext();
  const {
    settings,
    updateFontSize,
    updateLineHeight,
  } = useQuranSettings();
  
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [reminderInterval, setReminderInterval] = useState(2);

  const fontSizes = [
    { label: 'صغير', value: 'small' as const },
    { label: 'متوسط', value: 'medium' as const },
    { label: 'كبير', value: 'large' as const },
    { label: 'كبير جداً', value: 'xlarge' as const },
  ];

  const lineHeights = [
    { label: '1.4x', value: 1.4 },
    { label: '1.6x', value: 1.6 },
    { label: '1.8x', value: 1.8 },
    { label: '2.0x', value: 2.0 },
  ];

  const reminderIntervals = [
    { label: 'يوم واحد', value: 1 },
    { label: 'يومان', value: 2 },
    { label: '3 أيام', value: 3 },
    { label: 'أسبوع', value: 7 },
  ];

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text
          className="text-3xl font-bold mb-6 text-right"
          style={{ color: colors.primary }}
        >
          الإعدادات
        </Text>

        {/* Color Themes Section */}
        <View className="mb-6">
          <Text
            className="text-lg font-bold mb-3 text-right"
            style={{ color: colors.foreground }}
          >
            🎨 سمات الألوان
          </Text>
          <ModernColorPicker />
        </View>

        {/* Dark Mode Section */}
        <View
          className="mb-6 p-4 rounded-xl"
          style={{
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View className="flex-row items-center justify-between">
            <Switch
              value={colorScheme === 'dark'}
              onValueChange={(value) =>
                setColorScheme(value ? 'dark' : 'light')
              }
              trackColor={{
                false: colors.border,
                true: colors.primary,
              }}
              thumbColor={colors.background}
            />
            <Text
              className="text-base font-semibold text-right"
              style={{ color: colors.foreground }}
            >
              🌙 الوضع الليلي
            </Text>
          </View>
        </View>

        {/* Font Size Section */}
        <View className="mb-6">
          <Text
            className="text-lg font-bold mb-3 text-right"
            style={{ color: colors.foreground }}
          >
            📝 حجم الخط
          </Text>
          <View className="gap-2">
            {fontSizes.map((size) => (
              <TouchableOpacity
                key={size.value}
                onPress={() => updateFontSize(size.value)}
                className="p-3 rounded-lg flex-row items-center justify-between"
                style={{
                  backgroundColor:
              settings.fontSize === size.value ? colors.primary : colors.surface,
              borderWidth: 1,
              borderColor:
                settings.fontSize === size.value ? colors.primary : colors.border,
                }}
              >
                <Text
                  className="font-semibold"
                  style={{
                    color:
                  settings.fontSize === size.value
                    ? colors.background
                    : colors.foreground,
                  }}
                >
                  {size.label}
                </Text>
                {                settings.fontSize === size.value && (
                  <Text
                    style={{
                      color: colors.background,
                    }}
                  >
                    ✓
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Line Height Section */}
        <View className="mb-6">
          <Text
            className="text-lg font-bold mb-3 text-right"
            style={{ color: colors.foreground }}
          >
            ↕️ تباعد الأسطر
          </Text>
          <View className="gap-2">
            {lineHeights.map((height) => (
              <TouchableOpacity
                key={height.value}
                onPress={() => updateLineHeight(height.value)}
                className="p-3 rounded-lg flex-row items-center justify-between"
                style={{
                  backgroundColor:
              settings.lineHeight === height.value
                ? colors.primary
                : colors.surface,
              borderWidth: 1,
              borderColor:
                settings.lineHeight === height.value
                  ? colors.primary
                  : colors.border,
                }}
              >
                <Text
                  className="font-semibold"
                  style={{
                    color:
                  settings.lineHeight === height.value
                    ? colors.background
                    : colors.foreground,
                  }}
                >
                  {height.label}
                </Text>
                {                settings.lineHeight === height.value && (
                  <Text
                    style={{
                      color: colors.background,
                    }}
                  >
                    ✓
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Reminders Section */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Switch
              value={remindersEnabled}
              onValueChange={setRemindersEnabled}
              trackColor={{
                false: colors.border,
                true: colors.primary,
              }}
              thumbColor={colors.background}
            />
            <Text
              className="text-lg font-bold text-right"
              style={{ color: colors.foreground }}
            >
              🔔 التذكيرات
            </Text>
          </View>

          {remindersEnabled && (
            <View className="gap-2">
              {reminderIntervals.map((interval) => (
                <TouchableOpacity
                  key={interval.value}
                  onPress={() => setReminderInterval(interval.value)}
                  className="p-3 rounded-lg flex-row items-center justify-between"
                  style={{
                    backgroundColor:
                      reminderInterval === interval.value
                        ? colors.primary
                        : colors.surface,
                    borderWidth: 1,
                    borderColor:
                      reminderInterval === interval.value
                        ? colors.primary
                        : colors.border,
                  }}
                >
                  <Text
                    className="font-semibold"
                    style={{
                      color:
                        reminderInterval === interval.value
                          ? colors.background
                          : colors.foreground,
                    }}
                  >
                    {interval.label}
                  </Text>
                  {reminderInterval === interval.value && (
                    <Text
                      style={{
                        color: colors.background,
                      }}
                    >
                      ✓
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Developer Info Section */}
        <View
          className="mb-6 p-4 rounded-xl"
          style={{
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text
            className="text-base font-bold mb-2 text-right"
            style={{ color: colors.foreground }}
          >
            👨‍💻 عن المطور
          </Text>
          <Text
            className="text-sm text-right leading-relaxed"
            style={{ color: colors.muted, lineHeight: 20 }}
          >
            تم تطوير هذا المشروع بالكامل بواسطة المطور محمد حيدر.
          </Text>
          <Text
            className="text-xs text-right mt-3 leading-relaxed"
            style={{ color: colors.muted, lineHeight: 18 }}
          >
            أسأل الله العلي العظيم أن يجعل هذا العمل خالصا لوجهه الكريم، وأن
            يتقبله صدقة جارية لي ولوالدي، وأن يكون نورا ورفعة لنا في الدنيا
            والآخرة. لا تنسونا من صالح دعائكم بظهر الغيب.
          </Text>
        </View>

        <View className="h-4" />
      </ScrollView>
    </ScreenContainer>
  );
}
