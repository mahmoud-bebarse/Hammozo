import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import {
  authenticateWithBiometrics,
  checkBiometricAvailability,
} from '../../services/biometric';
import { LoginForm } from '../auth/components/LoginForm';

interface LockOverlayProps {
  visible: boolean;
  onUnlock: () => void;
}

export const LockOverlay: React.FC<LockOverlayProps> = ({
  visible,
  onUnlock,
}) => {
  const [showPasswordFallback, setShowPasswordFallback] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const checkBiometrics = async () => {
      const result = await checkBiometricAvailability();
      setBiometricAvailable(result.available);
    };

    if (visible) {
      checkBiometrics();
      setShowPasswordFallback(false);
    }
  }, [visible]);

  useEffect(() => {
    if (visible && biometricAvailable && !showPasswordFallback) {
      // Auto-trigger biometric prompt
      handleBiometricAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, biometricAvailable, showPasswordFallback]);

  const handleBiometricAuth = async () => {
    setIsAuthenticating(true);
    try {
      const result = await authenticateWithBiometrics();
      if (result.success) {
        onUnlock();
      } else {
        // User cancelled or failed, show password fallback
        setShowPasswordFallback(true);
      }
    } catch {
      setShowPasswordFallback(true);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleRetryBiometric = () => {
    setShowPasswordFallback(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="overFullScreen"
      transparent={false}
    >
      <View style={styles.container}>
        {showPasswordFallback ? (
          <View style={styles.content}>
            <LoginForm isUnlockMode />
            {biometricAvailable && (
              <TouchableOpacity
                style={styles.biometricButton}
                onPress={handleRetryBiometric}
                activeOpacity={0.7}
              >
                <Text style={styles.biometricButtonText}>
                  Use Biometric Authentication
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.biometricContainer}>
            <View style={styles.lockIcon}>
              <Text style={styles.lockEmoji}>🔒</Text>
            </View>
            <Text style={styles.title}>App Locked</Text>
            <Text style={styles.subtitle}>
              {biometricAvailable
                ? 'Authenticate to unlock'
                : 'Use password to unlock'}
            </Text>

            {isAuthenticating ? (
              <ActivityIndicator
                size="large"
                color={colors.primary}
                style={styles.loader}
              />
            ) : biometricAvailable ? (
              <TouchableOpacity
                style={styles.button}
                onPress={handleBiometricAuth}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>Unlock with Biometrics</Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={styles.passwordButton}
              onPress={() => setShowPasswordFallback(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.passwordButtonText}>Use Password</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  biometricContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  lockIcon: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  lockEmoji: {
    fontSize: 48,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  loader: {
    marginVertical: spacing.xl,
  },
  button: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    minWidth: 250,
  },
  buttonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
  },
  passwordButton: {
    marginTop: spacing.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  passwordButtonText: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
  },
  biometricButton: {
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  biometricButtonText: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
  },
});
