import { NativeModules, Platform } from 'react-native';

const { QuoteWidget } = NativeModules;

export const updateWidget = async (quoteText: string, author: string): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    console.log('Widget only supported on Android');
    return false;
  }

  try {
    if (QuoteWidget?.updateWidget) {
      await QuoteWidget.updateWidget(quoteText, author);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating widget:', error);
    return false;
  }
};
