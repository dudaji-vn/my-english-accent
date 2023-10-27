// @ts-nocheck
import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const HeartIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M14.962 2.493a6.5 6.5 0 0 1 8.99 6.007 6.499 6.499 0 0 1-1.905 4.597l-8.84 8.84a1 1 0 0 1-1.414 0l-8.84-8.84a6.501 6.501 0 0 1 9.194-9.194l.353.353.353-.353a6.501 6.501 0 0 1 2.109-1.41Zm2.488 1.505a4.5 4.5 0 0 0-3.183 1.319l-1.06 1.06a1 1 0 0 1-1.414 0l-1.06-1.06a4.501 4.501 0 0 0-6.366 6.366l8.133 8.133 8.133-8.133a4.502 4.502 0 0 0-3.183-7.685Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default HeartIcon;
