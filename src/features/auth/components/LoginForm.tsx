import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { useAuth } from '../hooks';
import { handleHttpError } from '../../../services/http';

interface LoginFormProps {
  isUnlockMode?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ isUnlockMode = false }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { login, isLoggingIn } = useAuth();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password');
      return;
    }

    setError(null);

    try {
      await login({ username: username.trim(), password: password.trim() });
    } catch (err) {
      setError(handleHttpError(err));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          {isUnlockMode ? 'Unlock App' : 'Welcome'}
        </Text>
        <Text style={styles.subtitle}>
          {isUnlockMode
            ? 'Enter your credentials to unlock'
            : 'Sign in to continue'}
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            placeholderTextColor={colors.textTertiary}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoggingIn}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            placeholderTextColor={colors.textTertiary}
            secureTextEntry
            editable={!isLoggingIn}
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, isLoggingIn && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoggingIn}
          activeOpacity={0.7}
        >
          {isLoggingIn ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.buttonText}>
              {isUnlockMode ? 'Unlock' : 'Sign In'}
            </Text>
          )}
        </TouchableOpacity>

        {!isUnlockMode && (
          <View style={styles.hintContainer}>
            <Text style={styles.hintText}>
              Hint: Use DummyJSON test credentials
            </Text>
            <Text style={styles.hintText}>Username: emilys</Text>
            <Text style={styles.hintText}>Password: emilyspass</Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  formContainer: {
    width: '100%',
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
  },
  button: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
  },
  error: {
    fontSize: typography.fontSize.sm,
    color: colors.error,
    marginTop: spacing.sm,
  },
  hintContainer: {
    marginTop: spacing.xl,
    padding: spacing.md,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.md,
  },
  hintText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
});
