import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  Platform,
  Alert,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme, useFontSizes, useSettingsStore } from '../../store/settingsStore';
import { useQuoteStore } from '../../store/quoteStore';
import { Colors, ThemeType, FontSizeType } from '../../constants/theme';
import { Strings } from '../../constants/strings';
import { Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { notificationService } from '../../services/notificationService';

interface SettingsScreenProps {
  navigation: any;
}

const themes: { key: ThemeType; label: string; colors: string[] }[] = [
  { key: 'light', label: 'Light', colors: ['#FFFFFF', '#6366F1'] },
  { key: 'dark', label: 'Dark', colors: ['#0F172A', '#818CF8'] },
  { key: 'rose', label: 'Rose', colors: ['#FFF1F2', '#F43F5E'] },
  { key: 'ocean', label: 'Ocean', colors: ['#F0F9FF', '#0EA5E9'] },
];

const fontSizeOptions: { key: FontSizeType; label: string }[] = [
  { key: 'small', label: 'Small' },
  { key: 'medium', label: 'Medium' },
  { key: 'large', label: 'Large' },
];

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const colors = useTheme();
  const fontSizes = useFontSizes();
  const { quoteOfDay } = useQuoteStore();
  const {
    theme,
    fontSize,
    notificationsEnabled,
    notificationTime,
    setTheme,
    setFontSize,
    setNotificationsEnabled,
    setNotificationTime,
  } = useSettingsStore();

  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [fontModalVisible, setFontModalVisible] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState(() => {
    const { hour } = notificationService.parseTimeString(notificationTime);
    return hour;
  });
  const [selectedMinute, setSelectedMinute] = useState(() => {
    const { minute } = notificationService.parseTimeString(notificationTime);
    return minute;
  });

  // Generate hour and minute options
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 15, 30, 45];

  // Initialize notification service
  useEffect(() => {
    notificationService.initialize();
  }, []);

  // Schedule notification when enabled or time changes
  useEffect(() => {
    if (notificationsEnabled && quoteOfDay) {
      const { hour, minute } = notificationService.parseTimeString(notificationTime);
      notificationService.scheduleDailyQuoteNotification(
        hour,
        minute,
        quoteOfDay.text,
        quoteOfDay.author
      );
    } else {
      notificationService.cancelDailyNotification();
    }
  }, [notificationsEnabled, notificationTime, quoteOfDay]);

  const handleNotificationToggle = async (enabled: boolean) => {
    if (enabled) {
      const hasPermission = await notificationService.requestPermissions();
      if (!hasPermission) {
        Alert.alert(
          'Permissions Required',
          'Please enable notifications in your device settings to receive daily quotes.',
          [{ text: 'OK' }]
        );
        return;
      }
    }
    setNotificationsEnabled(enabled);
  };

  const handleSaveTime = () => {
    const timeString = `${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
    setNotificationTime(timeString);
    setShowTimePicker(false);
  };

  const handleTestNotification = async () => {
    await notificationService.displayTestNotification();
    Alert.alert('Test Notification', 'A test notification has been sent!');
  };

  const formatDisplayTime = (timeString: string): string => {
    const { hour, minute } = notificationService.parseTimeString(timeString);
    return notificationService.formatTime(hour, minute);
  };

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: fontSizes.body - 3 }]}>
        {title}
      </Text>
      <View style={[styles.sectionContent, { backgroundColor: colors.surface }]}>
        {children}
      </View>
    </View>
  );

  const renderSettingRow = (
    icon: string,
    label: string,
    value?: string,
    onPress?: () => void,
    rightElement?: React.ReactNode,
    isLast = false
  ) => (
    <TouchableOpacity
      style={[
        styles.settingRow,
        !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border },
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={[styles.settingIcon, { backgroundColor: colors.primary + '20' }]}>
        <Icon name={icon} size={18} color={colors.primary} />
      </View>
      <Text style={[styles.settingLabel, { color: colors.text, fontSize: fontSizes.body }]}>{label}</Text>
      {rightElement || (
        <>
          {value && (
            <Text style={[styles.settingValue, { color: colors.textSecondary, fontSize: fontSizes.body - 2 }]}>
              {value}
            </Text>
          )}
          {onPress && (
            <Icon name="chevron-forward" size={18} color={colors.textTertiary} />
          )}
        </>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text, fontSize: fontSizes.title }]}>
          {Strings.settings.title}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Appearance */}
      {renderSection(Strings.settings.appearance, (
        <>
          {renderSettingRow(
            'color-palette-outline',
            Strings.settings.theme,
            themes.find((t) => t.key === theme)?.label,
            () => setThemeModalVisible(true)
          )}
          {renderSettingRow(
            'text-outline',
            Strings.settings.fontSize,
            fontSizeOptions.find((f) => f.key === fontSize)?.label,
            () => setFontModalVisible(true),
            undefined,
            true
          )}
        </>
      ))}

      {/* Notifications */}
      {renderSection(Strings.settings.notifications, (
        <>
          {renderSettingRow(
            'notifications-outline',
            Strings.settings.dailyQuote,
            undefined,
            undefined,
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationToggle}
              trackColor={{ false: colors.border, true: colors.primary + '80' }}
              thumbColor={notificationsEnabled ? colors.primary : colors.textTertiary}
            />
          )}
          {notificationsEnabled && (
            <>
              {renderSettingRow(
                'time-outline',
                Strings.settings.notificationTime,
                formatDisplayTime(notificationTime),
                () => setShowTimePicker(true)
              )}
              {renderSettingRow(
                'paper-plane-outline',
                'Test Notification',
                undefined,
                handleTestNotification,
                undefined,
                true
              )}
            </>
          )}
        </>
      ))}

      {/* Custom Time Picker Modal */}
      <Modal
        visible={showTimePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTimePicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowTimePicker(false)}
        >
          <View style={[styles.timePickerModal, { backgroundColor: colors.surface }]}>
            <View style={styles.timePickerHeader}>
              <Text style={[styles.modalTitle, { color: colors.text, fontSize: fontSizes.body + 2 }]}>
                Set Notification Time
              </Text>
              <TouchableOpacity onPress={handleSaveTime}>
                <Text style={[styles.doneButton, { color: colors.primary }]}>Done</Text>
              </TouchableOpacity>
            </View>
            
            {/* Time Display */}
            <View style={styles.timeDisplay}>
              <Text style={[styles.timeDisplayText, { color: colors.primary }]}>
                {notificationService.formatTime(selectedHour, selectedMinute)}
              </Text>
            </View>

            {/* Hour Selection */}
            <Text style={[styles.pickerLabel, { color: colors.textSecondary }]}>Hour</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.pickerContainer}
            >
              {hours.map((hour) => (
                <TouchableOpacity
                  key={hour}
                  style={[
                    styles.pickerItem,
                    selectedHour === hour && { backgroundColor: colors.primary },
                  ]}
                  onPress={() => setSelectedHour(hour)}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      { color: selectedHour === hour ? '#FFFFFF' : colors.text },
                    ]}
                  >
                    {hour % 12 || 12}
                    <Text style={styles.ampm}>{hour < 12 ? 'am' : 'pm'}</Text>
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Minute Selection */}
            <Text style={[styles.pickerLabel, { color: colors.textSecondary, marginTop: Spacing.md }]}>
              Minute
            </Text>
            <View style={styles.minuteContainer}>
              {minutes.map((minute) => (
                <TouchableOpacity
                  key={minute}
                  style={[
                    styles.minuteItem,
                    selectedMinute === minute && { backgroundColor: colors.primary },
                  ]}
                  onPress={() => setSelectedMinute(minute)}
                >
                  <Text
                    style={[
                      styles.minuteItemText,
                      { color: selectedMinute === minute ? '#FFFFFF' : colors.text },
                    ]}
                  >
                    :{minute.toString().padStart(2, '0')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Theme Selection Modal */}
      <Modal
        visible={themeModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setThemeModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setThemeModalVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text, fontSize: fontSizes.body + 2 }]}>
              Select Theme
            </Text>
            {themes.map((t) => (
              <TouchableOpacity
                key={t.key}
                style={[
                  styles.themeOption,
                  theme === t.key && { backgroundColor: colors.primary + '20' },
                ]}
                onPress={() => {
                  setTheme(t.key);
                  setThemeModalVisible(false);
                }}
              >
                <View style={styles.themePreview}>
                  <View
                    style={[
                      styles.themeColorSwatch,
                      { backgroundColor: t.colors[0], borderColor: colors.border },
                    ]}
                  />
                  <View
                    style={[styles.themeColorSwatch, { backgroundColor: t.colors[1] }]}
                  />
                </View>
                <Text style={[styles.themeLabel, { color: colors.text, fontSize: fontSizes.body }]}>
                  {t.label}
                </Text>
                {theme === t.key && (
                  <Icon name="checkmark" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Font Size Modal */}
      <Modal
        visible={fontModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFontModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setFontModalVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text, fontSize: fontSizes.body + 2 }]}>
              Select Font Size
            </Text>
            {fontSizeOptions.map((f) => (
              <TouchableOpacity
                key={f.key}
                style={[
                  styles.fontOption,
                  fontSize === f.key && { backgroundColor: colors.primary + '20' },
                ]}
                onPress={() => {
                  setFontSize(f.key);
                  setFontModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.fontLabel,
                    { color: colors.text },
                    f.key === 'small' && { fontSize: 14 },
                    f.key === 'medium' && { fontSize: 16 },
                    f.key === 'large' && { fontSize: 18 },
                  ]}
                >
                  {f.label}
                </Text>
                {fontSize === f.key && (
                  <Icon name="checkmark" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Spacer at bottom */}
      <View style={{ height: Spacing.xxl }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  backButton: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontWeight: '600',
  },
  section: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginLeft: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionContent: {
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingLabel: {
    flex: 1,
  },
  settingValue: {
    marginRight: Spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalContent: {
    width: '100%',
    maxWidth: 340,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
  },
  modalTitle: {
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs,
    gap: Spacing.md,
  },
  themePreview: {
    flexDirection: 'row',
    gap: 4,
  },
  themeColorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  themeLabel: {
    flex: 1,
  },
  fontOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs,
  },
  fontLabel: {
    flex: 1,
  },
  timePickerModal: {
    width: '100%',
    maxWidth: 340,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
  },
  timePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  doneButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeDisplay: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  timeDisplayText: {
    fontSize: 36,
    fontWeight: '700',
  },
  pickerLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  pickerContainer: {
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
  },
  pickerItem: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.xs,
    minWidth: 50,
    alignItems: 'center',
  },
  pickerItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  ampm: {
    fontSize: 10,
    fontWeight: '400',
  },
  minuteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.sm,
  },
  minuteItem: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  minuteItemText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
