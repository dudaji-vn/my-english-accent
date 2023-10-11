// @ts-nocheck
import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
const CloseIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <G
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      opacity={0.6}>
      <Path d="M18 6 6 18M6 6l12 12" />
    </G>
  </Svg>
);
export default CloseIcon;
