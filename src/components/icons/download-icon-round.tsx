// @ts-nocheck
import React from 'react';
import {View} from 'react-native';
import Svg, {SvgProps, Path, Rect, G} from 'react-native-svg';

const DownloadIconRound = (props: SvgProps) => {
  return (
    <View>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={48}
        height={48}
        fill="none"
        {...props}>
        <G opacity={0.6}>
          <Path
            fill="#CCC"
            fillRule="evenodd"
            d="M13 20a1 1 0 0 1 1-1h5.25a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1ZM13 16a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1ZM13 24a1 1 0 0 1 1-1h5.25a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1ZM13 28a1 1 0 0 1 1-1h5.25a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1ZM23.188 27.938a1 1 0 0 1 1 1v2.25a.125.125 0 0 0 .125.125h7.875a.125.125 0 0 0 .124-.125v-2.25a1 1 0 1 1 2 0v2.25a2.125 2.125 0 0 1-2.124 2.125h-7.876a2.125 2.125 0 0 1-2.125-2.126v-2.25a1 1 0 0 1 1-1Z"
            clipRule="evenodd"
          />
          <Path
            fill="#CCC"
            d="M29.25 22.188a1 1 0 1 0-2 0v4.335l-1.105-1.105a1 1 0 0 0-1.415 1.414l2.813 2.813a.997.997 0 0 0 1.412.002"
          />
          <Path
            fill="#CCC"
            d="m28.957 29.644 2.813-2.812a1 1 0 0 0-1.415-1.414l-1.105 1.105v-4.335"
          />
          <Rect
            width={47}
            height={47}
            x={0.5}
            y={0.5}
            stroke="#CCC"
            rx={23.5}
          />
        </G>
      </Svg>
    </View>
  );
};

export default DownloadIconRound;
