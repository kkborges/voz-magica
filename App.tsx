/**
 * Voz Mágica - App Principal
 * Aplicativo de apoio à fala infantil
 */

import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from '@/constants';
import { AppNavigator } from '@/navigation/AppNavigator';

function App(): JSX.Element {
  useEffect(() => {
    // Inicialização do app
    console.log('Voz Mágica - Iniciando aplicativo...');
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
