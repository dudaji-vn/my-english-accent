import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const IndividualIconActive = (props: SvgProps) => (
  <Svg width={25} height={24} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M8.5 14a5 5 0 0 0-5 5v2a1 1 0 1 0 2 0h14a1 1 0 1 0 2 0v-2a5 5 0 0 0-5-5h-8ZM12.5 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
    />
  </Svg>
);
export default IndividualIconActive;
