// @ts-nocheck
import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
import {COLORS} from '../../constants/design-system';
interface IFillIconProps extends SvgProps {
  isFill?: boolean;
}
const FillIcon = (props: IFillIconProps) => {
  const {isFill} = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}>
      <G clipPath="url(#a)" opacity={isFill ? 1 : 0.1}>
        <Path
          fill={isFill ? COLORS.highlight : '#333'}
          fillRule="evenodd"
          d="M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12Zm17.713-3.3a1 1 0 0 0-1.426-1.4l-6.162 6.273-2.412-2.456a1 1 0 1 0-1.426 1.402L9.412 15.7a1 1 0 0 0 1.426 0l6.875-7Z"
          clipRule="evenodd"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export default FillIcon;
