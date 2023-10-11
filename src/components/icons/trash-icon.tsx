import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
export const TrashIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G fill={props.color || '#333'} opacity={0.6}>
      <Path d="M10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1ZM15 17v-6a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0Z" />
      <Path
        fillRule="evenodd"
        d="M7 5V4a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1h4a1 1 0 1 1 0 2h-1v13a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7H3a1 1 0 0 1 0-2h4Zm2.293-1.707A1 1 0 0 1 10 3h4a1 1 0 0 1 1 1v1H9V4a1 1 0 0 1 .293-.707ZM18 7v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7h12Z"
        clipRule="evenodd"
      />
    </G>
  </Svg>
);
