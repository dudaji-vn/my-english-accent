import React from 'react';
import ApplicationNavigator from './src/navigation/applicationNav';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

const App = () => (
      <SafeAreaProvider>
            <StatusBar hidden={true} />
            <ApplicationNavigator colorScheme={null} />
      </SafeAreaProvider>
);

export default App;
