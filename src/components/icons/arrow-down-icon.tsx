import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const ArrowDownIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#333"
      fillRule="evenodd"
      d="M5.293 8.293a1 1 0 0 1 1.414 0L12 13.586l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414Z"
      clipRule="evenodd"
      opacity={0.6}
    />
  </Svg>
);
export default ArrowDownIcon;
