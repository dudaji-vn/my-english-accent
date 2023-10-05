import * as React from 'react';

import Svg, {Path, SvgProps} from 'react-native-svg';

import {COLORS} from '../../constants/design-system';

export const Subtract = (props: SvgProps) => (
  <Svg width={106} height={64} viewBox="0 0 106 64" fill="none" {...props}>
    <Path
      fill={COLORS.primary}
      d="M53 41c19.923 0 36.527-14.21 40.23-33.048C94.081 3.617 97.581 0 102 0h4v64H0V0h4c4.418 0 7.918 3.617 8.77 7.952C16.474 26.79 33.078 41 53 41Z"
    />
  </Svg>
);
