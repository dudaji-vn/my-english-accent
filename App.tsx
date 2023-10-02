import {Navigation} from './src/features/navigation';
import Providers from './src/providers/providers';
import React from 'react';

function App(): JSX.Element {
  return (
    <Providers>
      <Navigation />
    </Providers>
  );
}

export default App;
