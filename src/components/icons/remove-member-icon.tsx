import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const RemoveMemberIcon = (props: SvgProps) => (
  <Svg {...props} width={24} height={24} fill="none">
    <Path
      fill="#4080FF"
      fillRule="evenodd"
      d="M1.464 15.464A5 5 0 0 1 5 14h7a5 5 0 0 1 5 5v2a1 1 0 1 1-2 0v-2a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v2a1 1 0 1 1-2 0v-2a5 5 0 0 1 1.464-3.536ZM8.5 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0ZM16 11a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default RemoveMemberIcon;
