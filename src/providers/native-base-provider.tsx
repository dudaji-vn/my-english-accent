import {NativeBaseProvider as LibProvider, extendTheme} from 'native-base';

import React from 'react';
import {COLORS} from '../constants/design-system';

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
    29: 116,
    '14.5': 58,
    46: 184,
    31: 124,
    60: 240,
    68: 272,
  },
  shadows: {
    e3: {
      shadowColor: 'rgba(22, 22, 22, 0.4)',
      shadowOffset: {
        width: -10,
        height: -10,
      },
      shadowRadius: 24,
      elevation: 8,
    },
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
        px: 8,
        py: 4,
        minW: 29,
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
              fontSize: 'md',
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
        ghost: {
          bg: 'transparent',
          _pressed: {
            bg: 'transparent',
            _text: {
              color: 'primary',
            },
          },
          _text: {
            color: 'highlight',
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
    Progress: {
      defaultProps: {
        __filledTrack: {
          bg: 'highlight',
        },
      },
    },
  },
});

const NativeBaseProvider = ({children}: {children: React.ReactNode}) => {
  return <LibProvider theme={theme}>{children}</LibProvider>;
};

export default NativeBaseProvider;
