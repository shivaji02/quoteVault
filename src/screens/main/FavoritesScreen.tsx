import React, { useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useTheme, useFontSizes } from '../../store/settingsStore';
import { useQuoteStore } from '../../store/quoteStore';
import { QuoteCard, EmptyState, LoadingScreen } from '../../components';
import { Strings } from '../../constants/strings';
import { Spacing } from '../../constants/theme';
import type { Quote } from '../../types';

interface FavoritesScreenProps {
  navigation: any;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  navigation,
}) => {
  const colors = useTheme();
  const fontSizes = useFontSizes();
  const { favorites, quotes, fetchFavorites, fetchQuotes, isLoading } = useQuoteStore();
  
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    fetchFavorites();
    if (quotes.length === 0) {
      fetchQuotes();
    }
  }, []);

  // Get actual quote objects from favorite IDs
  const favoriteQuotes = useMemo(() => {
    return quotes.filter(quote => favorites.includes(quote.id));
  }, [quotes, favorites]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([fetchFavorites(), fetchQuotes()]);
    setRefreshing(false);
  }, []);

  const handleQuotePress = (quote: Quote) => {
    navigation.navigate('QuoteDetail', { quote });
  };

  const handleSharePress = (quote: Quote) => {
    navigation.navigate('Share', { quote });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.header }]}>
        {Strings.favorites.title}
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: fontSizes.body - 2 }]}>
        {favoriteQuotes.length} quote{favoriteQuotes.length !== 1 ? 's' : ''} saved
      </Text>
    </View>
  );

  const renderQuote = ({ item }: { item: Quote }) => {
    return (
      <QuoteCard
        quote={item}
        onPress={() => handleQuotePress(item)}
        onShare={() => handleSharePress(item)}
      />
    );
  };

  if (isLoading && favoriteQuotes.length === 0) {
    return <LoadingScreen />;
  }

  if (favoriteQuotes.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        <EmptyState
          icon="heart-outline"
          title={Strings.favorites.empty}
          subtitle={Strings.favorites.emptySubtext}
          actionLabel="Browse Quotes"
          onAction={() => navigation.navigate('Home')}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={favoriteQuotes}
        renderItem={renderQuote}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  title: {
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: Spacing.xs,
  },
  listContent: {
    paddingBottom: Spacing.xxl,
  },
});

