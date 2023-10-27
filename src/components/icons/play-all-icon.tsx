// @ts-nocheck
import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
import {COLORS} from '../../constants/design-system';
interface IPlayAllIconProps extends SvgProps {
  isHighLight?: boolean;
}
const PlayAllIcon = (props: IPlayAllIconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    opacity={props.isHighLight ? 1 : 0.6}
    {...props}>
    <Path
      fill={props.isHighLight ? COLORS.highlight : '#333'}
      fillRule="evenodd"
      d="M2 8a1 1 0 0 1 1-1h5.25a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1ZM2 4a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1ZM2 12a1 1 0 0 1 1-1h5.25a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1ZM2 16a1 1 0 0 1 1-1h5.25a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Z"
      clipRule="evenodd"
    />
    <Path
      fill={props.isHighLight ? COLORS.highlight : '#333'}
      d="M12.666 8.034a1 1 0 0 0-1.541.841v11.25a1 1 0 0 0 1.54.841l8.75-5.625a1 1 0 0 0 0-1.682l-8.75-5.625Z"
    />
  </Svg>
);
export default PlayAllIcon;
