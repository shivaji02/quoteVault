import React, { forwardRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import type { Quote, CardStyle } from '../types';
import { BorderRadius, Spacing } from '../constants/theme';

interface ShareCardProps {
  quote: Quote;
  style: CardStyle;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;
const CARD_HEIGHT = CARD_WIDTH * 1.2;

const gradientStyles = {
  purple: ['#667eea', '#764ba2'],
  sunset: ['#f093fb', '#f5576c'],
  ocean: ['#4facfe', '#00f2fe'],
  forest: ['#11998e', '#38ef7d'],
  midnight: ['#232526', '#414345'],
};

export const ShareCard = forwardRef<View, ShareCardProps>(
  ({ quote, style }, ref) => {
    if (style === 'gradient') {
      return (
        <View ref={ref} style={styles.cardContainer}>
          <LinearGradient
            colors={gradientStyles.purple}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientCard}
          >
            <View style={styles.sparkleContainer}>
              <Icon name="sparkles" size={28} color="rgba(255,255,255,0.6)" />
            </View>
            <Text style={styles.gradientQuote}>"{quote.text}"</Text>
            <View style={styles.authorContainer}>
              <View style={styles.authorLine} />
              <Text style={styles.gradientAuthor}>{quote.author}</Text>
            </View>
            <View style={styles.brandingContainer}>
              <Text style={styles.branding}>QuoteVault</Text>
            </View>
          </LinearGradient>
        </View>
      );
    }

    if (style === 'minimal') {
      return (
        <View ref={ref} style={styles.cardContainer}>
          <View style={styles.minimalCard}>
            <View style={styles.minimalQuoteMark}>
              <Text style={styles.quoteMark}>"</Text>
            </View>
            <Text style={styles.minimalQuote}>{quote.text}</Text>
            <Text style={styles.minimalAuthor}>— {quote.author}</Text>
            <View style={styles.minimalBranding}>
              <Text style={styles.minimalBrandText}>QuoteVault</Text>
            </View>
          </View>
        </View>
      );
    }

    // Elegant style
    return (
      <View ref={ref} style={styles.cardContainer}>
        <View style={styles.elegantCard}>
          <View style={styles.elegantBorder}>
            <View style={styles.elegantInner}>
              <View style={styles.elegantCorner} />
              <Text style={styles.elegantQuote}>"{quote.text}"</Text>
              <View style={styles.elegantDivider} />
              <Text style={styles.elegantAuthor}>{quote.author}</Text>
              <Text style={styles.elegantBranding}>QuoteVault</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    alignSelf: 'center',
  },
  // Gradient Style
  gradientCard: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    justifyContent: 'center',
  },
  sparkleContainer: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
  },
  gradientQuote: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 36,
    textAlign: 'center',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  authorLine: {
    width: 30,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  gradientAuthor: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontStyle: 'italic',
  },
  brandingContainer: {
    position: 'absolute',
    bottom: Spacing.lg,
    alignSelf: 'center',
  },
  branding: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 2,
  },
  // Minimal Style
  minimalCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  minimalQuoteMark: {
    position: 'absolute',
    top: Spacing.lg,
    left: Spacing.lg,
  },
  quoteMark: {
    fontSize: 80,
    color: '#E5E7EB',
    fontWeight: '700',
    lineHeight: 80,
  },
  minimalQuote: {
    fontSize: 22,
    fontWeight: '500',
    color: '#1F2937',
    lineHeight: 34,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },
  minimalAuthor: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: Spacing.lg,
    fontStyle: 'italic',
  },
  minimalBranding: {
    position: 'absolute',
    bottom: Spacing.lg,
    alignSelf: 'center',
  },
  minimalBrandText: {
    fontSize: 11,
    color: '#9CA3AF',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  // Elegant Style
  elegantCard: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: BorderRadius.xl,
    padding: Spacing.sm,
  },
  elegantBorder: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
  },
  elegantInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  elegantCorner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#D4AF37',
  },
  elegantQuote: {
    fontSize: 20,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 32,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  elegantDivider: {
    width: 60,
    height: 1,
    backgroundColor: '#D4AF37',
    marginVertical: Spacing.lg,
  },
  elegantAuthor: {
    fontSize: 14,
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  elegantBranding: {
    position: 'absolute',
    bottom: Spacing.md,
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 2,
  },
});

