import {SafeAreaView, Text, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import React from 'react';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>My English Accent</Text>
    </SafeAreaView>
  );
}

export default App;
