import * as React from 'react';

import Svg, {Path, SvgProps} from 'react-native-svg';

export const HeadphoneFilledIcon = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 24v-8a12 12 0 1 1 24 0v8"
    />
    <Path
      fill="#fff"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M28 25.333A2.667 2.667 0 0 1 25.333 28H24a2.667 2.667 0 0 1-2.667-2.667v-4A2.667 2.667 0 0 1 24 18.667h4v6.666Zm-24 0A2.667 2.667 0 0 0 6.667 28H8a2.667 2.667 0 0 0 2.667-2.667v-4A2.667 2.667 0 0 0 8 18.667H4v6.666Z"
    />
  </Svg>
);
