/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import AppleWalletScreen from './src/apple-wallet-screen/AppleWalletScreen';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <AppleWalletScreen />
    </SafeAreaProvider>
  );
}

export default App;
