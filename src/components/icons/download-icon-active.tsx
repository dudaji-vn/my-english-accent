import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const DownLoadIconActive = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M1 8a1 1 0 0 1 1-1h5.25a1 1 0 0 1 0 2H2a1 1 0 0 1-1-1ZM1 4a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1ZM1 12a1 1 0 0 1 1-1h5.25a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1ZM1 16a1 1 0 0 1 1-1h5.25a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1ZM11.188 15.938a1 1 0 0 1 1 1v2.25a.125.125 0 0 0 .124.125h7.876a.125.125 0 0 0 .125-.125v-2.25a1 1 0 1 1 2 0v2.25a2.125 2.125 0 0 1-2.125 2.125h-7.875a2.125 2.125 0 0 1-2.126-2.125v-2.25a1 1 0 0 1 1-1Z"
      clipRule="evenodd"
    />
    <Path
      fill="#fff"
      d="M17.25 10.188a1 1 0 1 0-2 0v4.335l-1.105-1.105a1 1 0 0 0-1.415 1.414l2.813 2.813a.997.997 0 0 0 1.412.002"
    />
    <Path
      fill="#fff"
      d="m16.957 17.644 2.813-2.812a1 1 0 0 0-1.415-1.414l-1.105 1.105v-4.335"
    />
  </Svg>
);
export default DownLoadIconActive;
