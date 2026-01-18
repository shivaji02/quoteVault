import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../store/settingsStore';
import { useQuoteStore } from '../../store/quoteStore';
import { QuoteCard, SearchBar, EmptyState, LoadingScreen } from '../../components';
import { Strings } from '../../constants/strings';
import { Spacing } from '../../constants/theme';
import type { Quote } from '../../types';

interface SearchScreenProps {
  navigation: any;
  route: any;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  navigation,
  route,
}) => {
  const colors = useTheme();
  const { searchQuotes, quotes, isLoading } = useQuoteStore();
  
  const [query, setQuery] = useState(route.params?.query || '');

  useEffect(() => {
    if (query) {
      searchQuotes(query);
    }
  }, []);

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      searchQuotes(query);
    }
  }, [query]);

  const handleQuotePress = (quote: Quote) => {
    navigation.navigate('QuoteDetail', { quote });
  };

  const handleSharePress = (quote: Quote) => {
    navigation.navigate('Share', { quote });
  };

  const renderQuote = ({ item }: { item: Quote }) => (
    <QuoteCard
      quote={item}
      onPress={() => handleQuotePress(item)}
      onShare={() => handleSharePress(item)}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onSubmit={handleSearch}
          />
        </View>
      </View>

      {/* Results */}
      {isLoading ? (
        <LoadingScreen message="Searching..." />
      ) : quotes.length === 0 && query ? (
        <EmptyState
          icon="search-outline"
          title={Strings.search.noResults}
          subtitle={Strings.search.tryDifferent}
        />
      ) : (
        <FlatList
          data={quotes}
          renderItem={renderQuote}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  backButton: {
    padding: Spacing.sm,
  },
  searchContainer: {
    flex: 1,
  },
  listContent: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
});

