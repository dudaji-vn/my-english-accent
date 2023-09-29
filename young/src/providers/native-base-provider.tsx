import {NativeBaseProvider as LibProvider, extendTheme} from 'native-base';

import React from 'react';

const theme = extendTheme({
  fonts: {
    heading: 'OpenSans',
    body: 'OpenSans',
    mono: 'OpenSans',
  },

  colors: {
    shading: '#081226',
    secondary: '#183773',
    primary: '#3060BF',
    highlight: '#4080FF',
    // text: '#333',
    stroke: '#333',
    background: '#fafafa',
    darkerBackground: '#f2f2f2',
    lighterBackground: '#fcfcfc',
    error: '#ff4040',
  },
});

const NativeBaseProvider = ({children}: {children: React.ReactNode}) => {
  return <LibProvider theme={theme}>{children}</LibProvider>;
};

export default NativeBaseProvider;
