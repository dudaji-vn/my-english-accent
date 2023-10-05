import * as React from 'react';

import Svg, {Path, SvgProps} from 'react-native-svg';

export const ChevronLeftIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#333"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m15 18-6-6 6-6"
    />
  </Svg>
);
