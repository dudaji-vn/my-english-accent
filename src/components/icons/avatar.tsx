// @ts-nocheck
import * as React from 'react';
import Svg, {SvgProps, G, Rect, Defs, ClipPath} from 'react-native-svg';
const AvatarIcon = (props: SvgProps) => (
  <Svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={100}
    height={100}
    fill="none">
    <G clipPath="url(#a)">
      <Rect width={100} height={100} fill="#fff" rx={50} />
      <Rect
        width={32}
        height={32}
        x={60}
        y={34}
        fill="#333"
        opacity={0.1}
        rx={16}
      />
      <Rect
        width={32}
        height={32}
        x={8}
        y={34}
        fill="#333"
        opacity={0.1}
        rx={16}
      />
      <Rect width={40} height={40} x={31} y={16} fill="#CCC" rx={20} />
      <Rect width={150} height={150} x={-24} y={67} fill="#CCC" rx={75} />
    </G>
    <Rect width={99} height={99} x={0.5} y={0.5} stroke="#CCC" rx={49.5} />
    <Defs>
      <ClipPath id="a">
        <Rect width={100} height={100} fill="#fff" rx={50} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default AvatarIcon;
