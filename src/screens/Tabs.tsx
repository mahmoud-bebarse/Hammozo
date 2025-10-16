import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../utils/types';
import { AllProductsScreen } from '../features/products/screens/AllProductsScreen';
import { CategoryScreen } from '../features/products/screens/CategoryScreen';
import { useAuth } from '../features/auth/hooks';
import { useAutoLock } from '../features/lock/useAutoLock';
import { LockOverlay } from '../features/lock/LockOverlay';
import { OfflineBanner } from '../features/offline/OfflineBanner';
import { colors } from '../theme/colors';
import { CHOSEN_CATEGORY } from '../utils/constants';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Sign Out "screen" component
const SignOutScreen: React.FC = () => {
  const { logout } = useAuth();

  useEffect(() => {
    // Use setTimeout to defer logout until after the component is fully mounted
    // This prevents view hierarchy errors
    const timer = setTimeout(() => {
      logout();
    }, 0);

    return () => clearTimeout(timer);
  }, [logout]);

  return <View style={styles.signOutContainer} />;
};

export const TabsNavigator: React.FC = () => {
  const { isLocked, unlock, resetTimer } = useAutoLock(true);

  return (
    <View style={styles.container} onTouchStart={resetTimer} onTouchEnd={resetTimer}>
      <OfflineBanner />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            borderTopColor: colors.border,
          },
          headerStyle: {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
          headerTintColor: colors.textPrimary,
        }}
      >
        <Tab.Screen
          name="AllProducts"
          component={AllProductsScreen}
          options={{
            title: 'All Products',
            tabBarLabel: 'All Products',
          }}
        />
        <Tab.Screen
          name="CategoryProducts"
          component={CategoryScreen}
          options={{
            title: CHOSEN_CATEGORY.charAt(0).toUpperCase() + CHOSEN_CATEGORY.slice(1),
            tabBarLabel: CHOSEN_CATEGORY.charAt(0).toUpperCase() + CHOSEN_CATEGORY.slice(1),
          }}
        />
        <Tab.Screen
          name="SignOut"
          component={SignOutScreen}
          options={{
            title: 'Sign Out',
            tabBarLabel: 'Sign Out',
          }}
        />
      </Tab.Navigator>
      <LockOverlay visible={isLocked} onUnlock={unlock} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signOutContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
