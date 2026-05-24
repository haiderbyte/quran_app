import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, Switch } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { ColorThemeSelector } from '@/components/color-theme-selector';
import { useQuranSettings } from '@/hooks/use-quran-settings';
import { useReminders } from '@/hooks/use-reminders';
import { useColors } from '@/hooks/use-colors';

export default function SettingsScreen() {
  const {
    settings,
    updateFontSize,
    updateLineHeight,
    toggleDarkMode,
  } = useQuranSettings();
  const {
    settings: reminderSettings,
    toggleReminders,
    setIntervalDays,
  } = useReminders();
  const colors = useColors();

  const fontSizes: Array<{ label: string; value: 'small' | 'medium' | 'large' | 'xlarge' }> = [
    { label: 'صغير', value: 'small' },
    { label: 'متوسط', value: 'medium' },
    { label: 'كبير', value: 'large' },
    { label: 'كبير جداً', value: 'xlarge' },
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

  const SettingSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <View className="mb-6">
      <Text
        className="text-lg font-bold mb-3"
        style={{ color: colors.primary }}
      >
        {title}
      </Text>
      {children}
    </View>
  );

  const OptionButton = ({
    label,
    isSelected,
    onPress,
  }: {
    label: string;
    isSelected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="px-4 py-3 rounded-lg mb-2"
      style={{
        backgroundColor: isSelected ? colors.primary : colors.surface,
        borderWidth: isSelected ? 0 : 1,
        borderColor: colors.border,
      }}
    >
      <Text
        className="text-center font-semibold"
        style={{
          color: isSelected ? colors.background : colors.foreground,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-3xl font-bold mb-6" style={{ color: colors.primary }}>
          الإعدادات
        </Text>

        {/* Font Size Section */}
        <SettingSection title="حجم الخط">
          {fontSizes.map((size) => (
            <OptionButton
              key={size.value}
              label={size.label}
              isSelected={settings.fontSize === size.value}
              onPress={() => updateFontSize(size.value)}
            />
          ))}
        </SettingSection>

        {/* Line Height Section */}
        <SettingSection title="تباعد الأسطر">
          {lineHeights.map((height) => (
            <OptionButton
              key={height.value}
              label={height.label}
              isSelected={settings.lineHeight === height.value}
              onPress={() => updateLineHeight(height.value)}
            />
          ))}
        </SettingSection>

        {/* Color Themes Section */}
        <SettingSection title="سمات الألوان">
          <ColorThemeSelector />
        </SettingSection>

        {/* Dark Mode Section */}
        <SettingSection title="الوضع الليلي">
          <View
            className="flex-row items-center justify-between px-4 py-4 rounded-lg"
            style={{ backgroundColor: colors.surface }}
          >
            <Text style={{ color: colors.foreground }}>تفعيل الوضع الليلي</Text>
            <Switch
              value={settings.isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={settings.isDarkMode ? colors.background : colors.muted}
            />
          </View>
        </SettingSection>

        {/* Reminders Section */}
        <SettingSection title="التذكيرات">
          <View
            className="px-4 py-4 rounded-lg mb-3"
            style={{ backgroundColor: colors.surface }}
          >
            <View className="flex-row items-center justify-between mb-3">
              <Text style={{ color: colors.foreground }}>تفعيل التذكيرات</Text>
              <Switch
                value={reminderSettings.enabled}
                onValueChange={toggleReminders}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={reminderSettings.enabled ? colors.background : colors.muted}
              />
            </View>
            <Text
              className="text-xs"
              style={{ color: colors.muted }}
            >
              سيتم تذكيرك بقراءة القرآن إذا لم تدخل التطبيق
            </Text>
          </View>

          {reminderSettings.enabled && (
            <>
              <Text
                className="text-sm font-semibold mb-2"
                style={{ color: colors.foreground }}
              >
                التذكير بعد:
              </Text>
              {reminderIntervals.map((interval) => (
                <OptionButton
                  key={interval.value}
                  label={interval.label}
                  isSelected={reminderSettings.intervalDays === interval.value}
                  onPress={() => setIntervalDays(interval.value)}
                />
              ))}
            </>
          )}
        </SettingSection>

        {/* About Section */}
        <SettingSection title="معلومات">
          <View
            className="px-4 py-4 rounded-lg"
            style={{ backgroundColor: colors.surface }}
          >
            <Text style={{ color: colors.foreground }} className="mb-3">
              <Text className="font-bold">التطبيق:</Text> مصحف النور
            </Text>
            <Text style={{ color: colors.foreground }} className="mb-3">
              <Text className="font-bold">الإصدار:</Text> 1.0.0
            </Text>
            <Text style={{ color: colors.foreground }} className="mb-4">
              <Text className="font-bold">المطور:</Text> محمد حيدر
            </Text>
            <Text style={{ color: colors.muted }} className="text-sm leading-relaxed mb-4">
              تطبيق لقراءة القرآن الكريم بدون إنترنت مع تصميم جميل ومريح للعين
            </Text>
            <View
              className="p-3 rounded-lg"
              style={{ backgroundColor: colors.border }}
            >
              <Text
                style={{ color: colors.foreground }}
                className="text-xs leading-relaxed text-right"
              >
                أسأل الله العلي العظيم أن يجعل هذا العمل خالصاً لوجهه الكريم، وأن يتقبله صدقة جارية لي ولوالدي، وأن يكون نوراً ورفعة لنا في الدنيا والآخرة. لا تنسونا من صالح دعائكم بظهر الغيب.
              </Text>
            </View>
          </View>
        </SettingSection>

        <View className="h-4" />
      </ScrollView>
    </ScreenContainer>
  );
}
