import {COLORS} from '../../constants/design-system';
import {Pressable} from 'native-base';
import React from 'react';
import {SvgProps} from 'react-native-svg';

type IconWrapperProps = SvgProps & {
  color?: string;
  children?: React.ReactNode;
  colorOnPress?: string;
  onPress?: () => void;
};

export const IconWrapper: React.FC<IconWrapperProps> = ({
  children,
  colorOnPress,
  color: _color,
  onPress,
  ...props
}) => {
  const [color, setColor] = React.useState(_color || COLORS.text);
  return (
    <Pressable
      onPressIn={() => {
        colorOnPress && setColor(colorOnPress);
        setTimeout(() => {
          setColor(_color || COLORS.text);
        }, 100);
        onPress && onPress();
      }}>
      {children &&
        React.cloneElement(children as React.ReactElement, {
          ...props,
          color,
        })}
    </Pressable>
  );
};
