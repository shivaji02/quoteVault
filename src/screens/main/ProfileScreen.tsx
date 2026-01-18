import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme, useFontSizes } from '../../store/settingsStore';
import { useAuthStore } from '../../store/authStore';
import { useQuoteStore } from '../../store/quoteStore';
import { Input, Button } from '../../components';
import { Strings } from '../../constants/strings';
import { Spacing, BorderRadius, Shadows } from '../../constants/theme';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const colors = useTheme();
  const fontSizes = useFontSizes();
  const { user, signOut, updateProfile } = useAuthStore();
  const { favorites, collections } = useQuoteStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.display_name || '');

  const handleSaveProfile = async () => {
    const result = await updateProfile({ display_name: displayName });
    if (!result.error) {
      setIsEditing(false);
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: signOut },
      ]
    );
  };

  const stats = [
    { label: 'Favorites', value: favorites.length, icon: 'heart' },
    { label: 'Collections', value: collections.length, icon: 'folder' },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
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
        
        <View style={styles.avatarContainer}>
          {user?.avatar_url ? (
            <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <Icon name="person" size={48} color="#FFFFFF" />
            </View>
          )}
          <TouchableOpacity style={styles.editAvatarButton}>
            <Icon name="camera" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        {isEditing ? (
          <View style={styles.editNameContainer}>
            <Input
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Your name"
              style={styles.nameInput}
              autoFocus
            />
          </View>
        ) : (
          <Text style={styles.userName}>{user?.display_name || 'Quote Lover'}</Text>
        )}
        <Text style={styles.userEmail}>{user?.email}</Text>
      </LinearGradient>

      {/* Stats */}
      <View style={[styles.statsContainer, { backgroundColor: colors.surface }, Shadows.medium]}>
        {stats.map((stat, index) => (
          <View
            key={stat.label}
            style={[
              styles.statItem,
              index < stats.length - 1 && {
                borderRightWidth: 1,
                borderRightColor: colors.border,
              },
            ]}
          >
            <Icon name={stat.icon as any} size={24} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Edit/Save buttons */}
      {isEditing ? (
        <View style={styles.editButtons}>
          <Button
            title="Cancel"
            onPress={() => {
              setDisplayName(user?.display_name || '');
              setIsEditing(false);
            }}
            variant="outline"
          />
          <Button title="Save" onPress={handleSaveProfile} />
        </View>
      ) : (
        <Button
          title={Strings.profile.editProfile}
          onPress={() => setIsEditing(true)}
          variant="secondary"
          style={styles.editButton}
          icon={<Icon name="pencil-outline" size={18} color={colors.primary} />}
        />
      )}

      {/* Menu Items */}
      <View style={[styles.menuSection, { backgroundColor: colors.surface }]}>
        <TouchableOpacity
          style={[styles.menuItem, { borderBottomColor: colors.border }]}
          onPress={() => navigation.navigate('Settings')}
        >
          <View style={[styles.menuIcon, { backgroundColor: colors.primary + '20' }]}>
            <Icon name="settings-outline" size={20} color={colors.primary} />
          </View>
          <Text style={[styles.menuText, { color: colors.text }]}>
            {Strings.settings.title}
          </Text>
          <Icon name="chevron-forward" size={20} color={colors.textTertiary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { borderBottomColor: colors.border }]}
          onPress={() => {}}
        >
          <View style={[styles.menuIcon, { backgroundColor: colors.secondary + '20' }]}>
            <Icon name="information-circle-outline" size={20} color={colors.secondary} />
          </View>
          <Text style={[styles.menuText, { color: colors.text }]}>
            {Strings.profile.about}
          </Text>
          <Icon name="chevron-forward" size={20} color={colors.textTertiary} />
        </TouchableOpacity>
      </View>

      {/* Sign Out */}
      <Button
        title={Strings.auth.signOut}
        onPress={handleSignOut}
        variant="ghost"
        style={styles.signOutButton}
        icon={<Icon name="log-out-outline" size={20} color={colors.error} />}
        textStyle={{ color: colors.error }}
      />

      {/* Version */}
      <Text style={[styles.version, { color: colors.textTertiary }]}>
        {Strings.profile.version} 1.0.0
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: Spacing.md,
    padding: Spacing.sm,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editNameContainer: {
    width: '60%',
    marginTop: Spacing.md,
  },
  nameInput: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: Spacing.md,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: Spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    marginTop: -20,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  editButton: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  menuSection: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    gap: Spacing.md,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  signOutButton: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
});

