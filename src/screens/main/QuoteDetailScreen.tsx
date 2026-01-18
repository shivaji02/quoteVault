import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme, useFontSizes } from '../../store/settingsStore';
import { useQuoteStore } from '../../store/quoteStore';
import { Button } from '../../components';
import { Strings } from '../../constants/strings';
import { Spacing, BorderRadius, Shadows } from '../../constants/theme';
import type { Quote, Collection } from '../../types';

interface QuoteDetailScreenProps {
  navigation: any;
  route: any;
}

export const QuoteDetailScreen: React.FC<QuoteDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { quote } = route.params as { quote: Quote };
  const colors = useTheme();
  const fontSizes = useFontSizes();
  const {
    toggleFavorite,
    isFavorite,
    collections,
    addToCollection,
    fetchCollections,
  } = useQuoteStore();

  const [collectionsModalVisible, setCollectionsModalVisible] = useState(false);
  const isLiked = isFavorite(quote.id);

  const handleToggleFavorite = async () => {
    await toggleFavorite(quote.id);
  };

  const handleShare = () => {
    navigation.navigate('Share', { quote });
  };

  const handleAddToCollection = async (collection: Collection) => {
    await addToCollection(collection.id, quote.id);
    setCollectionsModalVisible(false);
  };

  const openCollectionsModal = async () => {
    await fetchCollections();
    setCollectionsModalVisible(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with gradient */}
        <LinearGradient
          colors={colors.gradient as [string, string]}
          style={styles.header}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {quote.category.charAt(0).toUpperCase() + quote.category.slice(1)}
            </Text>
          </View>

          <Text style={[styles.quoteText, { fontSize: fontSizes.quote + 4 }]}>
            "{quote.text}"
          </Text>

          <View style={styles.authorContainer}>
            <View style={styles.authorLine} />
            <Text style={[styles.authorText, { fontSize: fontSizes.author + 2 }]}>
              {quote.author}
            </Text>
          </View>
        </LinearGradient>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.surface }]}
            onPress={handleToggleFavorite}
          >
            <Icon
              name={isLiked ? 'heart' : 'heart-outline'}
              size={28}
              color={isLiked ? colors.heart : colors.text}
            />
            <Text style={[styles.actionLabel, { color: colors.text, fontSize: fontSizes.body - 4 }]}>
              {isLiked ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.surface }]}
            onPress={openCollectionsModal}
          >
            <Icon name="folder-outline" size={28} color={colors.text} />
            <Text style={[styles.actionLabel, { color: colors.text, fontSize: fontSizes.body - 4 }]}>
              Add to Collection
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.surface }]}
            onPress={handleShare}
          >
            <Icon name="share-outline" size={28} color={colors.text} />
            <Text style={[styles.actionLabel, { color: colors.text, fontSize: fontSizes.body - 4 }]}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Share Card Preview */}
        <View style={styles.shareSection}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontSize: fontSizes.body + 2 }]}>
            Share as Card
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary, fontSize: fontSizes.body - 2 }]}>
            Create beautiful quote cards to share
          </Text>
          <Button
            title="Create Quote Card"
            onPress={handleShare}
            variant="primary"
            icon={<Icon name="image-outline" size={20} color="#FFFFFF" />}
            style={{ marginTop: Spacing.md }}
          />
        </View>
      </ScrollView>

      {/* Collections Modal */}
      <Modal
        visible={collectionsModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCollectionsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text, fontSize: fontSizes.title }]}>
                {Strings.collections.addTo}
              </Text>
              <TouchableOpacity onPress={() => setCollectionsModalVisible(false)}>
                <Icon name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {collections.length === 0 ? (
              <View style={styles.emptyCollections}>
                <Icon name="folder-outline" size={48} color={colors.textTertiary} />
                <Text style={[styles.emptyText, { color: colors.textSecondary, fontSize: fontSizes.body }]}>
                  No collections yet
                </Text>
                <Button
                  title="Create Collection"
                  onPress={() => {
                    setCollectionsModalVisible(false);
                    navigation.navigate('Collections');
                  }}
                  variant="secondary"
                  style={{ marginTop: Spacing.md }}
                />
              </View>
            ) : (
              <FlatList
                data={collections}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.collectionItem, { borderBottomColor: colors.border }]}
                    onPress={() => handleAddToCollection(item)}
                  >
                    <View
                      style={[styles.collectionIcon, { backgroundColor: colors.primary + '20' }]}
                    >
                      <Icon name="folder" size={20} color={colors.primary} />
                    </View>
                    <Text style={[styles.collectionName, { color: colors.text, fontSize: fontSizes.body }]}>
                      {item.name}
                    </Text>
                    <Icon name="add" size={20} color={colors.primary} />
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: Spacing.lg,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: Spacing.md,
    padding: Spacing.sm,
    zIndex: 1,
  },
  categoryBadge: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.lg,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  quoteText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 40,
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
  authorText: {
    color: 'rgba(255,255,255,0.9)',
    fontStyle: 'italic',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Spacing.lg,
    marginTop: -20,
  },
  actionButton: {
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    minWidth: 100,
    ...Shadows.small,
  },
  actionLabel: {
    fontSize: 12,
    marginTop: Spacing.xs,
    fontWeight: '500',
  },
  shareSection: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionSubtitle: {
    fontSize: 14,
    marginTop: Spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.lg,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  emptyCollections: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  emptyText: {
    fontSize: 16,
    marginTop: Spacing.md,
  },
  collectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    gap: Spacing.md,
  },
  collectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectionName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
});

