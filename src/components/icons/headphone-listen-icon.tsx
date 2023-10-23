// @ts-nocheck
import * as React from 'react';
import Svg, {SvgProps, G, Rect, Path} from 'react-native-svg';
const HeadPhoneListenIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <G opacity={0.4}>
      <Rect width={24} height={24} fill="#333" rx={12} />
      <Path
        fill="#ffff"
        fillRule="evenodd"
        d="M8.229 8.228A5.333 5.333 0 0 1 17.333 12v.666H16a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h.667a2 2 0 0 0 2-2V12a6.667 6.667 0 0 0-13.334 0v4.666a2 2 0 0 0 2 2H8a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H6.667V12c0-1.415.561-2.771 1.562-3.772ZM6.667 14v2.666a.666.666 0 0 0 .666.667H8a.666.666 0 0 0 .667-.667v-2A.667.667 0 0 0 8 14H6.667Zm10.666 0H16a.667.667 0 0 0-.667.666v2a.667.667 0 0 0 .667.667h.667a.666.666 0 0 0 .666-.667V14Z"
        clipRule="evenodd"
      />
    </G>
  </Svg>
);
export default HeadPhoneListenIcon;
