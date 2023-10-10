// @ts-nocheck
import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
const SearchIcon = () => {
  return (
    <Svg width={24} height={24} fill="none">
      <G
        stroke="#333"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        opacity={0.6}>
        <Path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.35-4.35" />
      </G>
    </Svg>
  );
};

export default SearchIcon;
