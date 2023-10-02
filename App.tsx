import LoginScreen from './src/features/auth/screens/login-screen';
import Providers from './src/providers/providers';
import React from 'react';

function App(): JSX.Element {
  return (
    <Providers>
      <LoginScreen />
      {/* <PauseIcon /> */}
    </Providers>
  );
}

export default App;
