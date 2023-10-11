import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
export const PauseIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#4080FF"
      d="M6 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H6ZM14 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4Z"
    />
  </Svg>
);
