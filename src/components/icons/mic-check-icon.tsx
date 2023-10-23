import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
export const MicCheckIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#4080FF"
      d="M9.172 1.172A4 4 0 0 1 16 4v6.252a8.016 8.016 0 0 0-5.648 5.393A4 4 0 0 1 8 12V4a4 4 0 0 1 1.172-2.828Z"
    />
    <Path
      fill="#4080FF"
      fillRule="evenodd"
      d="M12 18a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm8.857-1.65a.5.5 0 0 0-.714-.7l-3.08 3.136-1.206-1.227a.5.5 0 0 0-.714.7l1.563 1.591a.5.5 0 0 0 .713 0l3.438-3.5Z"
      clipRule="evenodd"
    />
    <Path
      fill="#4080FF"
      d="M6 10a1 1 0 0 0-2 0v2a8 8 0 0 0 6.202 7.795 8.022 8.022 0 0 1-.195-2.136A5.998 5.998 0 0 1 6 12v-2ZM12.708 24A8.035 8.035 0 0 1 11 21.876V22H8a1 1 0 1 0 0 2h4.708Z"
    />
  </Svg>
);
