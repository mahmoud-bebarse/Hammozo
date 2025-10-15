/**
 * Main App Entry Point
 * Production-ready React Native app with auth, auto-lock, and offline support
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './src/app/AppProvider';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <AppProvider />
    </SafeAreaProvider>
  );
}

export default App;
