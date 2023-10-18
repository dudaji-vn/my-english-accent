import React from 'react';
import {Navigation} from './src/features/navigation';
import Providers from './src/providers/providers';
import Stores from './src/redux/stores';
import {LogBox} from 'react-native';
import Tts from 'react-native-tts';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();
Tts.setDefaultVoice('en-us-x-iom-local');

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
