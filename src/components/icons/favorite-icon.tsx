// @ts-nocheck
import React from 'react';
import {View} from 'react-native';
import Svg, {G, Path, Rect} from 'react-native-svg';

const FavoriteIcon = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill="none">
      <G opacity={0.6}>
        <Path
          fill="#CCC"
          fillRule="evenodd"
          d="M26.462 14.493a6.5 6.5 0 0 1 7.085 10.604l-8.84 8.84a1 1 0 0 1-1.414 0l-8.84-8.84a6.501 6.501 0 0 1 9.194-9.194l.353.353.353-.353a6.501 6.501 0 0 1 2.109-1.41Zm2.488 1.505a4.5 4.5 0 0 0-3.183 1.319l-1.06 1.06a1 1 0 0 1-1.414 0l-1.06-1.06a4.501 4.501 0 1 0-6.366 6.366L24 31.816l8.133-8.133a4.502 4.502 0 0 0-3.183-7.685Z"
          clipRule="evenodd"
        />
        <Rect width={47} height={47} x={0.5} y={0.5} stroke="#CCC" rx={23.5} />
      </G>
    </Svg>
  );
};

export default FavoriteIcon;
