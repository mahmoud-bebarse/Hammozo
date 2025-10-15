import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { LoginForm } from '../features/auth/components/LoginForm';
import { colors } from '../theme/colors';

export const LoginScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <LoginForm />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});
