import React from 'react';
import {Navigation} from './src/features/navigation';
import Providers from './src/providers/providers';
import Stores from './src/redux/stores';

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
