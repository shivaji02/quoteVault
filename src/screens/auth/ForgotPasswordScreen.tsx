import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../store/settingsStore';
import { useAuthStore } from '../../store/authStore';
import { Input, Button } from '../../components';
import { Strings } from '../../constants/strings';
import { Spacing, BorderRadius } from '../../constants/theme';

interface ForgotPasswordScreenProps {
  navigation: any;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const colors = useTheme();
  const { resetPassword, isLoading } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(Strings.errors.invalidEmail);
      return;
    }
    
    setError('');
    const result = await resetPassword(email);
    
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.successContainer}>
          <View style={[styles.successIcon, { backgroundColor: colors.success + '20' }]}>
            <Icon name="checkmark-circle" size={64} color={colors.success} />
          </View>
          <Text style={[styles.successTitle, { color: colors.text }]}>
            Email Sent!
          </Text>
          <Text style={[styles.successText, { color: colors.textSecondary }]}>
            Check your inbox for password reset instructions.
          </Text>
          <Button
            title="Back to Login"
            onPress={() => navigation.navigate('Login')}
            variant="primary"
            style={{ marginTop: Spacing.xl }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
        <Icon name="key-outline" size={40} color="#FFFFFF" />
        <Text style={styles.headerTitle}>{Strings.auth.resetPassword}</Text>
      </LinearGradient>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.formContainer}
      >
        <View style={[styles.formCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Enter your email address and we'll send you a link to reset your password.
          </Text>

          <Input
            label={Strings.auth.email}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon="mail-outline"
            error={error}
          />

          <Button
            title={Strings.auth.sendResetLink}
            onPress={handleReset}
            loading={isLoading}
            fullWidth
            size="large"
            style={{ marginTop: Spacing.md }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
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
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: Spacing.sm,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    marginTop: -20,
  },
  formCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 24,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  successText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});

