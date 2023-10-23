import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
export const RotateIcon = (props: SvgProps) => (
  <Svg width={41} height={42} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.414}
      strokeWidth={2}
      d="M20.66 10.738c2.452 0 4.829.856 6.724 2.424a10.693 10.693 0 0 1 3.672 6.17 10.748 10.748 0 0 1-1.048 7.118 10.629 10.629 0 0 1-5.292 4.832 10.527 10.527 0 0 1-7.133.353 10.607 10.607 0 0 1-5.736-4.286 10.74 10.74 0 0 1-1.736-6.98"
    />
    <Path fill="#fff" d="m14.477 10.83 5.962-3.469v6.936l-5.962-3.468Z" />
  </Svg>
);
