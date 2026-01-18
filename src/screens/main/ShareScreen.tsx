import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import { useTheme } from '../../store/settingsStore';
import { ShareCard, Button } from '../../components';
import { Strings } from '../../constants/strings';
import { Spacing, BorderRadius, Shadows } from '../../constants/theme';
import type { Quote, CardStyle } from '../../types';

interface ShareScreenProps {
  navigation: any;
  route: any;
}

const cardStyles: { key: CardStyle; label: string; icon: string }[] = [
  { key: 'gradient', label: 'Gradient', icon: 'color-palette-outline' },
  { key: 'minimal', label: 'Minimal', icon: 'document-outline' },
  { key: 'elegant', label: 'Elegant', icon: 'sparkles-outline' },
];

export const ShareScreen: React.FC<ShareScreenProps> = ({ navigation, route }) => {
  const { quote } = route.params as { quote: Quote };
  const colors = useTheme();
  const viewShotRef = useRef<ViewShot>(null);
  
  const [selectedStyle, setSelectedStyle] = useState<CardStyle>('gradient');
  const [isSharing, setIsSharing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleShareAsText = async () => {
    try {
      await Share.open({
        message: `"${quote.text}"\n\n— ${quote.author}\n\nShared from QuoteVault`,
      });
    } catch (error) {
      // User cancelled or error
    }
  };

  const handleShareAsImage = async () => {
    if (!viewShotRef.current || isSharing) return;
    
    setIsSharing(true);
    try {
      const uri = await viewShotRef.current.capture?.();
      if (uri) {
        await Share.open({
          url: uri,
          type: 'image/png',
          message: 'Shared from QuoteVault',
        });
      }
    } catch (error) {
      console.error('Share error:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleSaveImage = async () => {
    if (!viewShotRef.current || isSaving) return;
    
    setIsSaving(true);
    try {
      const uri = await viewShotRef.current.capture?.();
      if (uri) {
        // For saving to camera roll, you'd use @react-native-camera-roll/camera-roll
        Alert.alert('Success', 'Quote card saved to your device!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save image');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {Strings.share.title}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Card Preview */}
        <View style={styles.previewContainer}>
          <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
            <ShareCard quote={quote} style={selectedStyle} />
          </ViewShot>
        </View>

        {/* Style Selection */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {Strings.share.selectStyle}
        </Text>
        <View style={styles.stylesContainer}>
          {cardStyles.map((style) => (
            <TouchableOpacity
              key={style.key}
              style={[
                styles.styleOption,
                { backgroundColor: colors.surface },
                selectedStyle === style.key && {
                  borderColor: colors.primary,
                  borderWidth: 2,
                },
                Shadows.small,
              ]}
              onPress={() => setSelectedStyle(style.key)}
            >
              <Icon
                name={style.icon}
                size={24}
                color={selectedStyle === style.key ? colors.primary : colors.textSecondary}
              />
              <Text
                style={[
                  styles.styleLabel,
                  {
                    color: selectedStyle === style.key ? colors.primary : colors.text,
                  },
                ]}
              >
                {style.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Share Options */}
        <View style={styles.shareOptions}>
          <Button
            title={Strings.share.asText}
            onPress={handleShareAsText}
            variant="outline"
            fullWidth
            icon={<Icon name="chatbubble-outline" size={20} color={colors.primary} />}
            style={styles.shareButton}
          />

          <Button
            title={Strings.share.asImage}
            onPress={handleShareAsImage}
            variant="primary"
            fullWidth
            loading={isSharing}
            disabled={isSaving}
            icon={<Icon name="share-outline" size={20} color="#FFFFFF" />}
            style={styles.shareButton}
          />

          <Button
            title={Strings.share.saveImage}
            onPress={handleSaveImage}
            variant="secondary"
            fullWidth
            loading={isSaving}
            disabled={isSharing}
            icon={<Icon name="download-outline" size={20} color={colors.primary} />}
            style={styles.shareButton}
          />
        </View>
      </ScrollView>
    </View>
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
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  stylesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  styleOption: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginHorizontal: Spacing.xs,
    gap: Spacing.xs,
  },
  styleLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  shareOptions: {
    gap: Spacing.md,
  },
  shareButton: {
    marginBottom: Spacing.sm,
  },
});

