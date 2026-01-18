import { Platform, PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_PERMISSION_KEY = 'notification_permission';
const SCHEDULED_NOTIFICATION_KEY = 'scheduled_notification';

export interface NotificationConfig {
  enabled: boolean;
  time: string; // HH:mm format
}

// Request notification permissions
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      const hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
      await AsyncStorage.setItem(NOTIFICATION_PERMISSION_KEY, String(hasPermission));
      return hasPermission;
    }
    
    // iOS handles permissions differently - would need react-native-push-notification
    return true;
  } catch (error) {
    console.error('Notification permission error:', error);
    return false;
  }
};

// Check if notifications are enabled
export const checkNotificationPermission = async (): Promise<boolean> => {
  try {
    const stored = await AsyncStorage.getItem(NOTIFICATION_PERMISSION_KEY);
    return stored === 'true';
  } catch {
    return false;
  }
};

// Schedule daily quote notification
export const scheduleDailyNotification = async (
  time: string,
  quoteText: string,
  author: string
): Promise<void> => {
  try {
    // Parse time
    const [hours, minutes] = time.split(':').map(Number);
    
    // Store scheduled notification info
    await AsyncStorage.setItem(
      SCHEDULED_NOTIFICATION_KEY,
      JSON.stringify({
        time,
        scheduledAt: new Date().toISOString(),
        quote: quoteText,
        author,
      })
    );

    // In a real app, you would use a library like:
    // - react-native-push-notification
    // - @notifee/react-native
    // - expo-notifications (if using Expo)
    
    console.log(`Daily notification scheduled for ${hours}:${minutes}`);
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};

// Cancel all scheduled notifications
export const cancelAllNotifications = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(SCHEDULED_NOTIFICATION_KEY);
    console.log('All notifications cancelled');
  } catch (error) {
    console.error('Error cancelling notifications:', error);
  }
};

// Get notification config from storage
export const getNotificationConfig = async (): Promise<NotificationConfig> => {
  try {
    const stored = await AsyncStorage.getItem('notification_config');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error getting notification config:', error);
  }
  
  return {
    enabled: true,
    time: '09:00',
  };
};

// Save notification config
export const saveNotificationConfig = async (
  config: NotificationConfig
): Promise<void> => {
  try {
    await AsyncStorage.setItem('notification_config', JSON.stringify(config));
  } catch (error) {
    console.error('Error saving notification config:', error);
  }
};

