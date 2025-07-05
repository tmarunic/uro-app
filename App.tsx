import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/services/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import dataService from './src/services/dataService';
import { theme } from './src/theme';

export default function App() {
  useEffect(() => {
    // Initialize the data service
    dataService.initialize();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <StatusBar style="light" backgroundColor={theme.colors.primary} />
        <AppNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}