import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
export const SmallMicFilledIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G
      fill={props.color ? props.color : '#333'}
      opacity={props.opacity ? props.opacity : 0.1}>
      <Path d="M12 0a4 4 0 0 0-4 4v8a4 4 0 1 0 8 0V4a4 4 0 0 0-4-4Z" />
      <Path d="M5 9a1 1 0 0 1 1 1v2a6 6 0 1 0 12 0v-2a1 1 0 1 1 2 0v2a8 8 0 0 1-7 7.937V22h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3v-2.063A8 8 0 0 1 4 12v-2a1 1 0 0 1 1-1Z" />
    </G>
  </Svg>
);
