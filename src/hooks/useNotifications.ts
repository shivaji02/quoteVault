import { useEffect, useCallback } from 'react';
import { useSettingsStore } from '../store/settingsStore';
import { useQuoteStore } from '../store/quoteStore';
import {
  requestNotificationPermission,
  scheduleDailyNotification,
  cancelAllNotifications,
} from '../utils/notifications';

export const useNotifications = () => {
  const { notificationsEnabled, notificationTime } = useSettingsStore();
  const { quoteOfDay } = useQuoteStore();

  const setupNotifications = useCallback(async () => {
    if (!notificationsEnabled) {
      await cancelAllNotifications();
      return;
    }

    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      console.log('Notification permission not granted');
      return;
    }

    if (quoteOfDay) {
      await scheduleDailyNotification(
        notificationTime,
        quoteOfDay.text,
        quoteOfDay.author
      );
    }
  }, [notificationsEnabled, notificationTime, quoteOfDay]);

  useEffect(() => {
    setupNotifications();
  }, [setupNotifications]);

  return {
    setupNotifications,
    requestPermission: requestNotificationPermission,
    cancelNotifications: cancelAllNotifications,
  };
};

