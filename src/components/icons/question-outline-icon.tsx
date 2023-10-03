import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

interface GProps {
  stroke: string;
  strokeLinecap: 'round';
  strokeLinejoin: 'round';
  strokeWidth: number;
  opacity: number;
}

export const QuestionOutlineIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G
      {...({
        stroke: '#333',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 2,
        opacity: 0.6,
      } as GProps)}>
      <Path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
      <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
    </G>
  </Svg>
);
