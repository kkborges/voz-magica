/**
 * Voz Mágica - App Principal
 * Aplicativo de apoio à fala infantil
 */

import React, { useEffect } from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from '@/constants';

function App(): JSX.Element {
  useEffect(() => {
    // Inicialização do app
    console.log('Voz Mágica - Iniciando aplicativo...');

    // TODO: Carregar perfis, configurações, etc.
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        {/* TODO: Adicionar navegação e telas */}
        {/* <NavigationContainer>
          <RootNavigator />
        </NavigationContainer> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default App;
