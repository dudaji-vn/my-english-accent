import * as React from 'react';

import Svg, {Path, SvgProps} from 'react-native-svg';

export const MicrophoneIcon = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M16 .333a5 5 0 0 0-5 5V16a5 5 0 0 0 10 0V5.333a5 5 0 0 0-5-5ZM13.88 3.212A3 3 0 0 1 19 5.333V16a3 3 0 1 1-6 0V5.333a3 3 0 0 1 .879-2.121Z"
      clipRule="evenodd"
    />
    <Path
      fill="#fff"
      d="M7.667 13.333a1 1 0 1 0-2 0V16A10.333 10.333 0 0 0 15 26.285v3.382h-4.333a1 1 0 1 0 0 2h10.667a1 1 0 0 0 0-2H17v-3.382A10.334 10.334 0 0 0 26.334 16v-2.667a1 1 0 0 0-2 0V16a8.333 8.333 0 1 1-16.667 0v-2.667Z"
    />
  </Svg>
);
