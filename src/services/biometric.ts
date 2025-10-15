import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({
  allowDeviceCredentials: true,
});

export interface BiometricCheckResult {
  available: boolean;
  biometryType?: BiometryTypes;
  error?: string;
}

export interface BiometricAuthResult {
  success: boolean;
  error?: string;
}

/**
 * Check if biometric authentication is available
 */
export const checkBiometricAvailability =
  async (): Promise<BiometricCheckResult> => {
    try {
      const { available, biometryType } =
        await rnBiometrics.isSensorAvailable();

      return {
        available,
        biometryType,
      };
    } catch (error) {
      return {
        available: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  };

/**
 * Authenticate using biometrics
 */
export const authenticateWithBiometrics =
  async (): Promise<BiometricAuthResult> => {
    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Unlock App',
        cancelButtonText: 'Use Password',
      });

      return { success };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      };
    }
  };
