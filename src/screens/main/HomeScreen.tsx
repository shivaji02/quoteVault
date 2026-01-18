import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme, useFontSizes } from '../../store/settingsStore';
import { useQuoteStore } from '../../store/quoteStore';
import { useAuthStore } from '../../store/authStore';
import { QuoteCard, CategoryChip, SearchBar, LoadingScreen } from '../../components';
import { Strings } from '../../constants/strings';
import { Spacing, BorderRadius, Shadows } from '../../constants/theme';
import type { Category, Quote } from '../../types';

const CATEGORIES: Category[] = [
  'motivation',
  'love',
  'success',
  'wisdom',
  'humor',
  'life',
  'friendship',
  'happiness',
];

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const colors = useTheme();
  const fontSizes = useFontSizes();
  const { user } = useAuthStore();
  const {
    quotes,
    quoteOfDay,
    isLoading,
    selectedCategory,
    fetchQuotes,
    fetchQuoteOfDay,
    fetchFavorites,
    setSelectedCategory,
    getFilteredQuotes,
  } = useQuoteStore();
  
  // Get filtered quotes based on selected category
  const filteredQuotes = getFilteredQuotes();

  const [refreshing, setRefreshing] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {
    fetchQuoteOfDay();
    fetchQuotes();
    fetchFavorites();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([fetchQuoteOfDay(), fetchQuotes()]);
    setRefreshing(false);
  }, [fetchQuoteOfDay, fetchQuotes]);

  const handleCategoryPress = (category: Category) => {
    if (selectedCategory === category) {
      // Deselect category - show all quotes
      setSelectedCategory(null);
    } else {
      // Select new category - filter quotes
      setSelectedCategory(category);
    }
  };

  const handleLoadMore = () => {
    // For now, all quotes are loaded at once
    // This can be enhanced with pagination later
  };

  const handleQuotePress = (quote: Quote) => {
    navigation.navigate('QuoteDetail', { quote });
  };

  const handleSharePress = (quote: Quote) => {
    navigation.navigate('Share', { quote });
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('Search', { query: searchQuery });
    }
  };

  const renderHeader = () => (
    <View>
      {/* Greeting Header */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={[styles.greeting, { color: colors.textSecondary, fontSize: fontSizes.body - 2 }]}>
            {getGreeting()}
          </Text>
          <Text style={[styles.userName, { color: colors.text, fontSize: fontSizes.header }]}>
            {user?.display_name || 'Quote Lover'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={[styles.profileButton, { backgroundColor: colors.primary }]}
        >
          <Icon name="person-outline" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmit={handleSearch}
        />
      </View>

      {/* Quote of the Day */}
      {quoteOfDay && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="sparkles" size={20} color={colors.secondary} />
            <Text style={[styles.sectionTitle, { color: colors.text, fontSize: fontSizes.body + 2 }]}>
              {Strings.home.quoteOfTheDay}
            </Text>
          </View>
          <QuoteCard
            quote={quoteOfDay}
            variant="featured"
            onPress={() => handleQuotePress(quoteOfDay)}
            onShare={() => handleSharePress(quoteOfDay)}
          />
        </View>
      )}

      {/* Categories */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text, fontSize: fontSizes.body + 2 }]}>
          {Strings.home.categories}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map((category) => (
            <CategoryChip
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onPress={() => handleCategoryPress(category)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Section Title */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text, fontSize: fontSizes.body + 2 }]}>
          {selectedCategory
            ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Quotes`
            : Strings.home.forYou}
        </Text>
      </View>
    </View>
  );

  const renderQuote = ({ item }: { item: Quote }) => (
    <QuoteCard
      quote={item}
      onPress={() => handleQuotePress(item)}
      onShare={() => handleSharePress(item)}
    />
  );

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.loadingFooter}>
        <Text style={{ color: colors.textSecondary }}>{Strings.common.loading}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={colors.background === '#0F172A' ? 'light-content' : 'dark-content'}
      />
      <FlatList
        data={filteredQuotes}
        renderItem={renderQuote}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Spacing.xxl,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  greeting: {
    fontSize: 14,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: Spacing.xs,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  section: {
    marginTop: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    gap: Spacing.xs,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  categoriesContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  loadingFooter: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
});

