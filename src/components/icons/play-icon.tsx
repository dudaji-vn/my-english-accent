import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
export const PlayIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill={props.color || '#333'}
      d="M5.54 2.159A1 1 0 0 0 4 3v18a1 1 0 0 0 1.54.841l14-9a1 1 0 0 0 0-1.682l-14-9Z"
      opacity={0.6}
    />
  </Svg>
);
