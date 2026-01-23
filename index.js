/**
 * Voz Mágica - Entry Point
 */

// Importa polyfills para garantir compatibilidade
import './src/utils/polyfills';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
