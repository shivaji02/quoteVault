import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  RefreshControl,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme, useFontSizes } from '../../store/settingsStore';
import { useQuoteStore } from '../../store/quoteStore';
import { Input, Button, EmptyState } from '../../components';
import { Strings } from '../../constants/strings';
import { Spacing, BorderRadius, Shadows } from '../../constants/theme';
import type { Collection } from '../../types';

interface CollectionsScreenProps {
  navigation: any;
}

export const CollectionsScreen: React.FC<CollectionsScreenProps> = ({
  navigation,
}) => {
  const colors = useTheme();
  const fontSizes = useFontSizes();
  const { collections, fetchCollections, createCollection, deleteCollection } = useQuoteStore();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchCollections();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchCollections();
    setRefreshing(false);
  }, []);

  const handleCreateCollection = async () => {
    if (newCollectionName.trim()) {
      await createCollection(newCollectionName.trim());
      setNewCollectionName('');
      setModalVisible(false);
    }
  };

  const handleDeleteCollection = (collection: Collection) => {
    Alert.alert(
      'Delete Collection',
      `Are you sure you want to delete "${collection.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteCollection(collection.id),
        },
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.header }]}>
          {Strings.collections.title}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: fontSizes.body - 2 }]}>
          {collections.length} collection{collections.length !== 1 ? 's' : ''}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.addButton, { backgroundColor: colors.primary }]}
      >
        <Icon name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  const renderCollection = ({ item }: { item: Collection }) => (
    <TouchableOpacity
      style={[styles.collectionCard, { backgroundColor: colors.surface }, Shadows.small]}
      onPress={() => navigation.navigate('CollectionDetail', { collection: item })}
      onLongPress={() => handleDeleteCollection(item)}
    >
      <View style={[styles.collectionIcon, { backgroundColor: colors.primary + '20' }]}>
        <Icon name="folder-outline" size={24} color={colors.primary} />
      </View>
      <View style={styles.collectionInfo}>
        <Text style={[styles.collectionName, { color: colors.text, fontSize: fontSizes.body }]}>
          {item.name}
        </Text>
        <Text style={[styles.collectionCount, { color: colors.textSecondary, fontSize: fontSizes.body - 2 }]}>
          {item.quote_count || 0} quotes
        </Text>
      </View>
      <Icon name="chevron-forward" size={20} color={colors.textTertiary} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {collections.length === 0 ? (
        <>
          {renderHeader()}
          <EmptyState
            icon="folder-outline"
            title={Strings.collections.empty}
            subtitle={Strings.collections.emptySubtext}
            actionLabel={Strings.collections.create}
            onAction={() => setModalVisible(true)}
          />
        </>
      ) : (
        <FlatList
          data={collections}
          renderItem={renderCollection}
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
      )}

      {/* Create Collection Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text, fontSize: fontSizes.title }]}>
              {Strings.collections.create}
            </Text>
            <Input
              label={Strings.collections.name}
              value={newCollectionName}
              onChangeText={setNewCollectionName}
              placeholder="e.g., Morning Motivation"
              autoFocus
            />
            <View style={styles.modalButtons}>
              <Button
                title={Strings.common.cancel}
                onPress={() => {
                  setNewCollectionName('');
                  setModalVisible(false);
                }}
                variant="ghost"
              />
              <Button
                title={Strings.common.save}
                onPress={handleCreateCollection}
                disabled={!newCollectionName.trim()}
              />
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: Spacing.xxl,
  },
  collectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xs,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
  },
  collectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectionInfo: {
    flex: 1,
  },
  collectionName: {
    fontSize: 16,
    fontWeight: '600',
  },
  collectionCount: {
    fontSize: 14,
    marginTop: 2,
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
    maxWidth: 400,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: Spacing.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
});

