import * as React from 'react';

import Svg, {Path, SvgProps} from 'react-native-svg';

export const HeadphoneIcon = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M16 5A11 11 0 0 0 5 16v1.667h3a3.667 3.667 0 0 1 3.667 3.666v4A3.667 3.667 0 0 1 8 29H6.667A3.667 3.667 0 0 1 3 25.333V16a13 13 0 0 1 26 0v9.333A3.667 3.667 0 0 1 25.333 29H24a3.667 3.667 0 0 1-3.667-3.667v-4A3.666 3.666 0 0 1 24 17.667h3V16A11 11 0 0 0 16 5Zm11 14.667h-3a1.667 1.667 0 0 0-1.667 1.666v4A1.666 1.666 0 0 0 24 27h1.333A1.666 1.666 0 0 0 27 25.333v-5.666ZM5 25.333A1.666 1.666 0 0 0 6.667 27H8a1.667 1.667 0 0 0 1.667-1.667v-4A1.667 1.667 0 0 0 8 19.667H5v5.666Z"
      clipRule="evenodd"
    />
  </Svg>
);
