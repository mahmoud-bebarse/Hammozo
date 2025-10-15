import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../utils/types';
import { selectIsAuthenticated } from '../../features/auth/selectors';
import { LoginScreen } from '../../screens/LoginScreen';
import { TabsNavigator } from '../../screens/Tabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Main" component={TabsNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
