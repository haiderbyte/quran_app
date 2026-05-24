import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ReminderSettings {
  enabled: boolean;
  intervalDays: number; // عدد الأيام قبل التذكير
  lastReminderDate: string | null; // آخر تاريخ تم التذكير فيه
}

const DEFAULT_REMINDER_SETTINGS: ReminderSettings = {
  enabled: true,
  intervalDays: 2,
  lastReminderDate: null,
};

const STORAGE_KEY = 'quran_reminder_settings';

export function useReminders() {
  const [settings, setSettings] = useState<ReminderSettings>(DEFAULT_REMINDER_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShowReminder, setShouldShowReminder] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSettings(JSON.parse(stored));
      } else {
        // Set initial last reminder date to today
        const today = new Date().toISOString().split('T')[0];
        const initialSettings = {
          ...DEFAULT_REMINDER_SETTINGS,
          lastReminderDate: today,
        };
        setSettings(initialSettings);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialSettings));
      }
      checkIfShouldRemind();
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading reminder settings:', error);
      setIsLoading(false);
    }
  };

  const checkIfShouldRemind = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const currentSettings = JSON.parse(stored) as ReminderSettings;
      if (!currentSettings.enabled || !currentSettings.lastReminderDate) {
        return;
      }

      const lastReminderDate = new Date(currentSettings.lastReminderDate);
      const today = new Date();
      const daysDifference = Math.floor(
        (today.getTime() - lastReminderDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDifference >= currentSettings.intervalDays) {
        setShouldShowReminder(true);
      }
    } catch (error) {
      console.error('Error checking reminder:', error);
    }
  };

  const updateReminderSettings = async (newSettings: Partial<ReminderSettings>) => {
    try {
      const updated = { ...settings, ...newSettings };
      setSettings(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving reminder settings:', error);
    }
  };

  const dismissReminder = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      await updateReminderSettings({ lastReminderDate: today });
      setShouldShowReminder(false);
    } catch (error) {
      console.error('Error dismissing reminder:', error);
    }
  };

  const toggleReminders = async (enabled: boolean) => {
    await updateReminderSettings({ enabled });
  };

  const setIntervalDays = async (days: number) => {
    await updateReminderSettings({ intervalDays: days });
  };

  return {
    settings,
    isLoading,
    shouldShowReminder,
    dismissReminder,
    toggleReminders,
    setIntervalDays,
    updateReminderSettings,
  };
}
