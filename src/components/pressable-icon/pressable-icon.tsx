import React from 'react';
import {Pressable} from 'native-base';
import {InterfacePressableProps} from 'native-base/lib/typescript/components/primitives/Pressable/types';

type Props = {
  children: React.ReactNode;
} & InterfacePressableProps;

export const PressableIcon = (props: Props) => {
  return (
    <Pressable minW={16} {...props} p={5}>
      {props.children}
    </Pressable>
  );
};
