import React from 'react';
import {Navigation} from './src/features/navigation';
import Providers from './src/providers/providers';
import Stores from './src/redux/stores';
import {LogBox} from 'react-native';
import Tts from 'react-native-tts';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {initializePlayer} from './server/src/services/player.service';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();
Tts.setDefaultVoice('en-us-x-iom-local');
initializePlayer();

function App(): JSX.Element {
  return (
    <Stores>
      <Providers>
        <GestureHandlerRootView style={{flex: 1}}>
          <Navigation />
        </GestureHandlerRootView>
      </Providers>
    </Stores>
  );
}

export default App;
