import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { store } from '../features/auth/store';
import { queryClient, queryPersister } from '../services/queryClient';
import { RootNavigator } from './navigation/RootNavigator';
import { useRestoreSession } from '../features/auth/hooks';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { LockOverlay } from '../features/lock/LockOverlay';
import { colors } from '../theme/colors';

/**
 * Inner app component that handles session restoration
 */
const AppContent: React.FC = () => {
  const { isRestoring, shouldShowLock, dismissLock } = useRestoreSession();

  if (isRestoring) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <RootNavigator />
      <LockOverlay visible={shouldShowLock} onUnlock={dismissLock} />
    </>
  );
};

/**
 * Root app provider that wraps the app with all necessary providers
 */
export const AppProvider: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: queryPersister }}
      >
        <AppContent />
      </PersistQueryClientProvider>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
