import React from 'react';
import {Image, Text, View} from 'native-base';
import {COLORS} from '../../constants/design-system';
import {ViewProps} from 'react-native';
import {InterfaceViewProps} from 'native-base/lib/typescript/components/basic/View/types';

const emptyDataImg = require('../../assets/images/empty.png');
type Props = {
  children?: React.ReactNode;
  title?: string;
} & InterfaceViewProps;

export const EmptyData = ({
  children,
  title = 'List empty',
  ...props
}: Props) => {
  return (
    <View mt={1} justifyContent={'center'} alignItems={'center'} {...props}>
      <Image
        width={200}
        height={200}
        resizeMode="contain"
        source={emptyDataImg}
      />
      <Text mt={5} mb={3} fontSize={20} color={COLORS.highlight}>
        {title}
      </Text>
      {children}
    </View>
  );
};
