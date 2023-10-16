import React from 'react';
import {Image, Text, View} from 'native-base';
import {COLORS} from '../../constants/design-system';
const emptyDataImg = require('../../assets/images/empty.png');
type Props = {
  children?: React.ReactNode;
  title?: string;
};

export const EmptyData = ({children, title = 'List empty'}: Props) => {
  return (
    <View justifyContent={'center'} alignItems={'center'}>
      <Image
        width={200}
        height={200}
        resizeMode="contain"
        source={emptyDataImg}
      />
      <Text mt={5} mb={3} fontSize={20} color={COLORS.highlight}>
        {title}
      </Text>
      <Text>{children}</Text>
    </View>
  );
};
