import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
export const FilterIcon = (props: SvgProps) => (
  <Svg opacity={0.6} width={24} height={24} fill="none" {...props}>
    <Path
      stroke={props.color || '#333'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.37 12.277h-10M20.37 7.777h-16M14.37 16.777h-4"
    />
  </Svg>
);
