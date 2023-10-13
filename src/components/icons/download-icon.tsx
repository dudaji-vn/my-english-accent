// @ts-nocheck
import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
const DownLoadIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <G
      stroke="#333"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      opacity={0.6}>
      <Path d="M8.25 10H3M21 6H3M8.25 14H3M8.25 18H3M22.313 18.938v2.25a1.125 1.125 0 0 1-1.125 1.125h-7.875a1.125 1.125 0 0 1-1.126-1.125v-2.25M14.438 16.125l2.812 2.813 2.813-2.813M17.25 18.938v-6.75" />
    </G>
  </Svg>
);
export default DownLoadIcon;
