import * as React from 'react';

import Svg, {Circle, SvgProps} from 'react-native-svg';

export const DotIcon = (props: SvgProps) => (
  <Svg width={4} height={4} fill="none" {...props}>
    <Circle cx={2} cy={2} r={2} fill="#333" opacity={0.3} />
  </Svg>
);
