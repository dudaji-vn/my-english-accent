import {NativeBaseProvider as LibProvider, extendTheme} from 'native-base';

import {COLORS} from '../constants/design-system';
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
    stroke: '#333',
    background: '#fafafa',
    darkerBackground: '#f2f2f2',
    lighterBackground: '#fcfcfc',
    error: '#ff4040',
  },
  sizes: {
    14: 56,
    15: 60,
    '14.5': 58,
  },
  components: {
    Input: {
      defaultProps: {
        height: 14,
        size: 'xl',
        rounded: 'lg',
        _focus: {
          borderColor: 'highlight',
          bg: 'lighterBackground',
          selectionColor: 'highlight',
        },
        _invalid: {
          borderColor: 'error',
          selectionColor: 'error',
        },
      },
    },
    Text: {
      defaultProps: {
        color: COLORS.text,
        fontSize: 'md',
      },
    },
    Button: {
      defaultProps: {
        height: 14,
        rounded: 'lg',
        _text: {
          fontWeight: 'semibold',
          fontSize: 'md',
        },
      },
      variants: {
        outline: {
          bg: 'white',
          borderColor: 'highlight',
          borderWidth: 1,
          _pressed: {
            bg: 'white',
            borderColor: 'primary',
            _text: {
              color: 'primary',
            },
          },
          _text: {
            color: 'highlight',
          },
        },
        solid: {
          bg: 'highlight',
          _pressed: {
            bg: 'primary',
          },
          _text: {
            color: 'white',
          },
        },
      },
    },
    Modal: {
      defaultProps: {
        _backdrop: {
          bg: '#000',
          opacity: 0.7,
        },
      },
    },
  },
});

const NativeBaseProvider = ({children}: {children: React.ReactNode}) => {
  return <LibProvider theme={theme}>{children}</LibProvider>;
};

export default NativeBaseProvider;
