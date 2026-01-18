import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme, useFontSizes } from '../store/settingsStore';
import { BorderRadius, Spacing, Shadows } from '../constants/theme';
import type { Category } from '../types';

interface CategoryChipProps {
  category: Category;
  isSelected?: boolean;
  onPress: () => void;
}

const categoryIcons: Record<Category, string> = {
  motivation: 'rocket-outline',
  love: 'heart-outline',
  success: 'trophy-outline',
  wisdom: 'bulb-outline',
  humor: 'happy-outline',
  life: 'leaf-outline',
  friendship: 'people-outline',
  happiness: 'sunny-outline',
};

const categoryLabels: Record<Category, string> = {
  motivation: 'Motivation',
  love: 'Love',
  success: 'Success',
  wisdom: 'Wisdom',
  humor: 'Humor',
  life: 'Life',
  friendship: 'Friendship',
  happiness: 'Happiness',
};

export const CategoryChip: React.FC<CategoryChipProps> = ({
  category,
  isSelected = false,
  onPress,
}) => {
  const colors = useTheme();
  const fontSizes = useFontSizes();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.chip,
        {
          backgroundColor: isSelected ? colors.primary : colors.surface,
          borderColor: isSelected ? colors.primary : colors.border,
        },
        isSelected && Shadows.small,
      ]}
    >
      <Icon
        name={categoryIcons[category]}
        size={fontSizes.body}
        color={isSelected ? '#FFFFFF' : colors.primary}
      />
      <Text
        style={[
          styles.label,
          { color: isSelected ? '#FFFFFF' : colors.text, fontSize: fontSizes.body - 2 },
        ]}
      >
        {categoryLabels[category]}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    marginRight: Spacing.sm,
    gap: Spacing.xs,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});

