import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
export const GamepadFilledIcon = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M2.278 13.653a9.95 9.95 0 0 1 9.714-7.792h8.016a9.95 9.95 0 0 1 9.714 7.792l2.189 9.85a3.695 3.695 0 0 1-6.22 3.415l-4.149-4.15a1.238 1.238 0 0 0-.875-.362h-9.334c-.329 0-.643.13-.875.362l-4.15 4.15A3.695 3.695 0 0 1 .09 23.504l2.19-9.85Zm8.128-2.198a1 1 0 0 1 1 1v1.238h1.238a1 1 0 0 1 0 2h-1.238v1.238a1 1 0 1 1-2 0v-1.238H8.168a1 1 0 0 1 0-2h1.238v-1.238a1 1 0 0 1 1-1Zm10.07 1a1.119 1.119 0 1 1-2.238 0 1.119 1.119 0 0 1 2.237 0Zm3.356 5.594a1.119 1.119 0 1 0 0-2.237 1.119 1.119 0 0 0 0 2.237Z"
      clipRule="evenodd"
    />
  </Svg>
);
