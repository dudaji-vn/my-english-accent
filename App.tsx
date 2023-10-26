import React from 'react';
import {Navigation} from './src/features/navigation';
import Providers from './src/providers/providers';
import Stores from './src/redux/stores';
import {LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {initializePlayer} from './server/src/services/player.service';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

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
