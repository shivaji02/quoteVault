import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme, useFontSizes } from '../../store/settingsStore';
import { useQuoteStore } from '../../store/quoteStore';
import { QuoteCard, EmptyState } from '../../components';
import { Spacing, BorderRadius } from '../../constants/theme';
import type { Quote, Collection } from '../../types';

interface CollectionDetailScreenProps {
  navigation: any;
  route: any;
}

export const CollectionDetailScreen: React.FC<CollectionDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { collection } = route.params as { collection: Collection };
  const colors = useTheme();
  const fontSizes = useFontSizes();
  const { getCollectionQuotes, removeFromCollection, deleteCollection } = useQuoteStore();

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    setIsLoading(true);
    const collectionQuotes = await getCollectionQuotes(collection.id);
    setQuotes(collectionQuotes);
    setIsLoading(false);
  };

  const handleRemoveQuote = (quote: Quote) => {
    Alert.alert(
      'Remove Quote',
      'Remove this quote from the collection?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await removeFromCollection(collection.id, quote.id);
            setQuotes(quotes.filter((q) => q.id !== quote.id));
          },
        },
      ]
    );
  };

  const handleDeleteCollection = () => {
    Alert.alert(
      'Delete Collection',
      `Are you sure you want to delete "${collection.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteCollection(collection.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleQuotePress = (quote: Quote) => {
    navigation.navigate('QuoteDetail', { quote });
  };

  const handleSharePress = (quote: Quote) => {
    navigation.navigate('Share', { quote });
  };

  const renderHeader = () => (
    <View style={styles.headerInfo}>
      <View style={[styles.collectionIcon, { backgroundColor: colors.primary + '20' }]}>
        <Icon name="folder" size={32} color={colors.primary} />
      </View>
      <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.header }]}>
        {collection.name}
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: fontSizes.body - 2 }]}>
        {quotes.length} quote{quotes.length !== 1 ? 's' : ''}
      </Text>
    </View>
  );

  const renderQuote = ({ item }: { item: Quote }) => (
    <View style={styles.quoteContainer}>
      <QuoteCard
        quote={item}
        onPress={() => handleQuotePress(item)}
        onShare={() => handleSharePress(item)}
      />
      <TouchableOpacity
        style={[styles.removeIconButton, { backgroundColor: colors.error }]}
        onPress={() => handleRemoveQuote(item)}
      >
        <Icon name="close" size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>
          {collection.name}
        </Text>
        <TouchableOpacity onPress={handleDeleteCollection} style={styles.deleteButton}>
          <Icon name="trash-outline" size={22} color={colors.error} />
        </TouchableOpacity>
      </View>

      {quotes.length === 0 && !isLoading ? (
        <>
          {renderHeader()}
          <EmptyState
            icon="document-text-outline"
            title="No quotes yet"
            subtitle="Add quotes to this collection from the quote detail screen"
            actionLabel="Browse Quotes"
            onAction={() => navigation.navigate('Home')}
          />
        </>
      ) : (
        <FlatList
          data={quotes}
          renderItem={renderQuote}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
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
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  backButton: {
    padding: Spacing.sm,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: Spacing.sm,
  },
  deleteButton: {
    padding: Spacing.sm,
  },
  headerInfo: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  collectionIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
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
  quoteContainer: {
    position: 'relative',
  },
  removeIconButton: {
    position: 'absolute',
    top: 0,
    right: Spacing.md - 4,
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

