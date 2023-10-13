// @ts-nocheck
import React from 'react';
import {View} from 'react-native';
import Svg, {Path, Rect, G} from 'react-native-svg';

const DownloadIconRound = () => {
  return (
    <View>
      <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
        <G opacity={0.6}>
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13 20C13 19.4477 13.4477 19 14 19H19.25C19.8023 19 20.25 19.4477 20.25 20C20.25 20.5523 19.8023 21 19.25 21H14C13.4477 21 13 20.5523 13 20Z"
            fill="#CCCCCC"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13 16C13 15.4477 13.4477 15 14 15H32C32.5523 15 33 15.4477 33 16C33 16.5523 32.5523 17 32 17H14C13.4477 17 13 16.5523 13 16Z"
            fill="#CCCCCC"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13 24C13 23.4477 13.4477 23 14 23H19.25C19.8023 23 20.25 23.4477 20.25 24C20.25 24.5523 19.8023 25 19.25 25H14C13.4477 25 13 24.5523 13 24Z"
            fill="#CCCCCC"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13 28C13 27.4477 13.4477 27 14 27H19.25C19.8023 27 20.25 27.4477 20.25 28C20.25 28.5523 19.8023 29 19.25 29H14C13.4477 29 13 28.5523 13 28Z"
            fill="#CCCCCC"
          />
          <Path
            d="M29.25 22.1875C29.25 21.6352 28.8023 21.1875 28.25 21.1875C27.6977 21.1875 27.25 21.6352 27.25 22.1875V26.5233L26.1446 25.4179C25.7541 25.0274 25.1209 25.0274 24.7304 25.4179C24.3399 25.8084 24.3399 26.4416 24.7304 26.8321L27.5429 29.6446C27.6388 29.7405 27.7493 29.8128 27.8672 29.8616C27.9851 29.9105 28.1144 29.9375 28.25 29.9375C28.5251 29.9375 28.7742 29.8264 28.955 29.6467"
            fill="#CCCCCC"
          />
          <Path
            d="M28.9574 29.6443L31.7696 26.8321C32.1601 26.4416 32.1601 25.8084 31.7696 25.4179C31.3791 25.0274 30.7459 25.0274 30.3554 25.4179L29.25 26.5233V22.1875"
            fill="#CCCCCC"
          />
        </G>
        <Rect
          x="0.5"
          y="0.5"
          width="47"
          height="47"
          rx="23.5"
          stroke="#CCCCCC"
        />
      </Svg>
    </View>
  );
};

export default DownloadIconRound;
