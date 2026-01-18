import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme, useFontSizes } from '../store/settingsStore';
import { useQuoteStore } from '../store/quoteStore';
import { BorderRadius, Shadows, Spacing } from '../constants/theme';
import type { Quote } from '../types';

interface QuoteCardProps {
  quote: Quote;
  onPress?: () => void;
  onShare?: () => void;
  showActions?: boolean;
  variant?: 'default' | 'featured' | 'compact';
}

const { width } = Dimensions.get('window');

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  onPress,
  onShare,
  showActions = true,
  variant = 'default',
}) => {
  const colors = useTheme();
  const fontSizes = useFontSizes();
  const { toggleFavorite, isFavorite } = useQuoteStore();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const heartAnim = useRef(new Animated.Value(1)).current;
  
  const isLiked = isFavorite(quote.id);

  const handleFavoritePress = async () => {
    // Animate heart
    Animated.sequence([
      Animated.timing(heartAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(heartAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    
    await toggleFavorite(quote.id);
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  if (variant === 'featured') {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <LinearGradient
            colors={colors.gradient as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.featuredCard, Shadows.large]}
          >
            <View style={styles.featuredQuoteIcon}>
              <Icon name="sparkles" size={24} color="rgba(255,255,255,0.8)" />
            </View>
            <Text style={[styles.featuredText, { fontSize: fontSizes.quote }]}>
              "{quote.text}"
            </Text>
            <Text style={[styles.featuredAuthor, { fontSize: fontSizes.author }]}>
              — {quote.author}
            </Text>
            {showActions && (
              <View style={styles.featuredActions}>
                <TouchableOpacity
                  onPress={handleFavoritePress}
                  style={styles.actionButton}
                >
                  <Animated.View style={{ transform: [{ scale: heartAnim }] }}>
                    <Icon
                      name={isLiked ? 'heart' : 'heart-outline'}
                      size={24}
                      color="#FFFFFF"
                    />
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onShare} style={styles.actionButton}>
                  <Icon name="share-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            )}
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    );
  }

  if (variant === 'compact') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[
          styles.compactCard,
          { backgroundColor: colors.surface },
          Shadows.small,
        ]}
      >
        <Text
          style={[
            styles.compactText,
            { color: colors.text, fontSize: fontSizes.body },
          ]}
          numberOfLines={2}
        >
          "{quote.text}"
        </Text>
        <Text
          style={[
            styles.compactAuthor,
            { color: colors.textSecondary, fontSize: fontSizes.author - 2 },
          ]}
        >
          — {quote.author}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.card,
          { backgroundColor: colors.surface, transform: [{ scale: scaleAnim }] },
          Shadows.medium,
        ]}
      >
        <View style={[styles.categoryBadge, { backgroundColor: colors.primary + '20' }]}>
          <Text style={[styles.categoryText, { color: colors.primary, fontSize: fontSizes.body - 4 }]}>
            {quote.category.charAt(0).toUpperCase() + quote.category.slice(1)}
          </Text>
        </View>
        
        <Text style={[styles.quoteIcon, { color: colors.primary + '40' }]}>❝</Text>
        
        <Text style={[styles.quoteText, { color: colors.text, fontSize: fontSizes.quote }]}>
          "{quote.text}"
        </Text>
        
        <Text
          style={[
            styles.authorText,
            { color: colors.textSecondary, fontSize: fontSizes.author },
          ]}
        >
          — {quote.author}
        </Text>

        {showActions && (
          <View style={[styles.actions, { borderTopColor: colors.border }]}>
            <TouchableOpacity
              onPress={handleFavoritePress}
              style={styles.actionBtn}
            >
              <Animated.View style={{ transform: [{ scale: heartAnim }] }}>
                <Icon
                  name={isLiked ? 'heart' : 'heart-outline'}
                  size={22}
                  color={isLiked ? colors.heart : colors.textSecondary}
                />
              </Animated.View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={onShare} style={styles.actionBtn}>
              <Icon name="share-outline" size={22} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionBtn}>
              <Icon name="bookmark-outline" size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.sm,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  quoteIcon: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.md,
    fontSize: 48,
    fontWeight: '300',
  },
  quoteText: {
    fontWeight: '500',
    lineHeight: 32,
    marginBottom: Spacing.md,
  },
  authorText: {
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
  },
  actionBtn: {
    padding: Spacing.sm,
  },
  actionButton: {
    padding: Spacing.sm,
  },
  featuredCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    minHeight: 200,
  },
  featuredQuoteIcon: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
  },
  featuredText: {
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 34,
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  featuredAuthor: {
    color: 'rgba(255,255,255,0.8)',
    fontStyle: 'italic',
  },
  featuredActions: {
    flexDirection: 'row',
    marginTop: Spacing.lg,
    gap: Spacing.md,
  },
  compactCard: {
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginRight: Spacing.sm,
    width: width * 0.6,
  },
  compactText: {
    fontWeight: '500',
    marginBottom: Spacing.xs,
  },
  compactAuthor: {
    fontStyle: 'italic',
  },
});

