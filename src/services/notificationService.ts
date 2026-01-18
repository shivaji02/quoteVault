import notifee, {
  AndroidImportance,
  RepeatFrequency,
  TriggerType,
  TimestampTrigger,
  AndroidNotificationSetting,
} from '@notifee/react-native';
import { Platform } from 'react-native';

const CHANNEL_ID = 'daily-quote';
const NOTIFICATION_ID = 'daily-quote-notification';

class NotificationService {
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Request permissions
      await this.requestPermissions();

      // Create notification channel for Android
      if (Platform.OS === 'android') {
        await notifee.createChannel({
          id: CHANNEL_ID,
          name: 'Daily Quote',
          description: 'Daily inspirational quote notifications',
          importance: AndroidImportance.HIGH,
          sound: 'default',
          vibration: true,
        });
      }

      this.initialized = true;
      console.log('Notification service initialized');
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
    }
  }

  async requestPermissions(): Promise<boolean> {
    try {
      const settings = await notifee.requestPermission();
      
      if (Platform.OS === 'android') {
        const batteryOptimizationEnabled = 
          await notifee.isBatteryOptimizationEnabled();
        
        if (batteryOptimizationEnabled) {
          // Optionally prompt user to disable battery optimization
          console.log('Battery optimization is enabled');
        }
      }

      return settings.authorizationStatus >= 1; // AUTHORIZED or PROVISIONAL
    } catch (error) {
      console.error('Failed to request permissions:', error);
      return false;
    }
  }

  async scheduleDailyQuoteNotification(
    hour: number,
    minute: number,
    quoteText: string,
    author: string
  ): Promise<void> {
    try {
      // Cancel any existing notification
      await this.cancelDailyNotification();

      // Calculate the next trigger time
      const now = new Date();
      const trigger = new Date();
      trigger.setHours(hour, minute, 0, 0);

      // If the time has already passed today, schedule for tomorrow
      if (trigger <= now) {
        trigger.setDate(trigger.getDate() + 1);
      }

      const timestampTrigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: trigger.getTime(),
        repeatFrequency: RepeatFrequency.DAILY,
      };

      await notifee.createTriggerNotification(
        {
          id: NOTIFICATION_ID,
          title: '✨ Quote of the Day',
          body: `"${quoteText.substring(0, 100)}${quoteText.length > 100 ? '...' : ''}" — ${author}`,
          android: {
            channelId: CHANNEL_ID,
            importance: AndroidImportance.HIGH,
            pressAction: {
              id: 'default',
            },
            smallIcon: 'ic_launcher',
          },
          ios: {
            sound: 'default',
          },
        },
        timestampTrigger
      );

      console.log(`Daily notification scheduled for ${hour}:${minute.toString().padStart(2, '0')}`);
    } catch (error) {
      console.error('Failed to schedule notification:', error);
    }
  }

  async cancelDailyNotification(): Promise<void> {
    try {
      await notifee.cancelNotification(NOTIFICATION_ID);
      console.log('Daily notification cancelled');
    } catch (error) {
      console.error('Failed to cancel notification:', error);
    }
  }

  async displayTestNotification(): Promise<void> {
    try {
      await notifee.displayNotification({
        title: '✨ Quote of the Day',
        body: '"The only way to do great work is to love what you do." — Steve Jobs',
        android: {
          channelId: CHANNEL_ID,
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'default',
          },
          smallIcon: 'ic_launcher',
        },
        ios: {
          sound: 'default',
        },
      });
    } catch (error) {
      console.error('Failed to display test notification:', error);
    }
  }

  async getScheduledNotifications(): Promise<any[]> {
    try {
      const notifications = await notifee.getTriggerNotifications();
      return notifications;
    } catch (error) {
      console.error('Failed to get scheduled notifications:', error);
      return [];
    }
  }

  parseTimeString(timeString: string): { hour: number; minute: number } {
    const [hourStr, minuteStr] = timeString.split(':');
    return {
      hour: parseInt(hourStr, 10) || 9,
      minute: parseInt(minuteStr, 10) || 0,
    };
  }

  formatTime(hour: number, minute: number): string {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  }
}

export const notificationService = new NotificationService();
