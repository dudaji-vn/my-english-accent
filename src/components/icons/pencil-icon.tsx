import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
export const PencilIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M19 1a3.829 3.829 0 0 0-2.707 1.121l-13.5 13.5a1 1 0 0 0-.258.444l-1.5 5.5a1 1 0 0 0 1.228 1.228l5.5-1.5a1 1 0 0 0 .444-.258l13.5-13.5A3.828 3.828 0 0 0 19 1Z"
    />
  </Svg>
);
