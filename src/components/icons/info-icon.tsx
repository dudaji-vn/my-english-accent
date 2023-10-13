// @ts-nocheck
import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const InfoIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="#4080FF"
      stroke="#4080FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 17.25v-5.5M12 7.75h.01"
    />
  </Svg>
);
export default InfoIcon;
