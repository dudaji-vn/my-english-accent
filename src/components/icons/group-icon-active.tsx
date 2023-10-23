import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const GroupIconActive = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M5 14a5 5 0 0 0-5 5v2a1 1 0 1 0 2 0h14a1 1 0 1 0 2 0v-2a5 5 0 0 0-5-5H5ZM9 2a5 5 0 1 0 0 10A5 5 0 0 0 9 2ZM16.248 2.161a1 1 0 1 0-.496 1.938 3 3 0 0 1 0 5.812 1 1 0 1 0 .496 1.938 5 5 0 0 0 0-9.688ZM20.25 14.162a1 1 0 1 0-.5 1.936A3 3 0 0 1 22 19.001V21a1 1 0 1 0 2 0v-2a5 5 0 0 0-3.75-4.838Z"
    />
  </Svg>
);
export default GroupIconActive;
