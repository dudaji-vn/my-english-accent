import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const FavoriteIconActive = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#fff"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.501 5.501 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.501 5.501 0 0 0 0-7.78Z"
    />
  </Svg>
);
export default FavoriteIconActive;
