import React from 'react';
import {Navigation} from './src/features/navigation';
import Providers from './src/providers/providers';
import Stores from './src/redux/stores';
import {LogBox} from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

function App(): JSX.Element {
  return (
    <Stores>
      <Providers>
        <Navigation />
      </Providers>
    </Stores>
  );
}

export default App;
