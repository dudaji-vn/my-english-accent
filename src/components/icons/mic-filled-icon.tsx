import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
export const MicFilledIcon = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      fill={props.color || '#fff'}
      d="M12.464 1.798A5 5 0 0 1 21 5.333V16a5 5 0 0 1-10 0V5.333a5 5 0 0 1 1.464-3.535Z"
    />
    <Path
      fill={props.color || '#fff'}
      d="M7.667 13.333a1 1 0 1 0-2 0V16A10.333 10.333 0 0 0 15 26.285v3.382h-4.333a1 1 0 1 0 0 2h10.666a1 1 0 1 0 0-2H17v-3.382A10.333 10.333 0 0 0 26.333 16v-2.667a1 1 0 1 0-2 0V16a8.333 8.333 0 0 1-16.666 0v-2.667Z"
    />
  </Svg>
);
