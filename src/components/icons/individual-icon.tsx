import React from 'react';
import {View} from 'react-native';
import Svg, {Path, Rect} from 'react-native-svg';

const IndividualIcon = () => {
  return (
    <View>
      <Svg width={48} height={48} viewBox="0 0 48 48">
        <Path
          fill="#CCCCCC"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 14C21.2386 14 19 16.2386 19 19C19 21.7614 21.2386 24 24 24C26.7614 24 29 21.7614 29 19C29 16.2386 26.7614 14 24 14ZM21 19C21 17.3431 22.3431 16 24 16C25.6569 16 27 17.3431 27 19C27 20.6569 25.6569 22 24 22C22.3431 22 21 20.6569 21 19Z"
        />
        <Path
          fill="#CCCCCC"
          d="M20 26C18.6739 26 17.4021 26.5268 16.4645 27.4645C15.5268 28.4021 15 29.6739 15 31V33C15 33.5523 15.4477 34 16 34C16.5523 34 17 33.5523 17 33V31C17 30.2043 17.3161 29.4413 17.8787 28.8787C18.4413 28.3161 19.2044 28 20 28H28C28.7956 28 29.5587 28.3161 30.1213 28.8787C30.6839 29.4413 31 30.2044 31 31V33C31 33.5523 31.4477 34 32 34C32.5523 34 33 33.5523 33 33V31C33 29.6739 32.4732 28.4021 31.5355 27.4645C30.5979 26.5268 29.3261 26 28 26H20Z"
        />
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

export default IndividualIcon;
