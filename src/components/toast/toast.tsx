import {Text, View} from 'native-base';
import React from 'react';
import {Dimensions} from 'react-native';

type Props = {
  children: React.ReactNode;
};
var fullWidth = Dimensions.get('window').width;
const Toast = (props: Props) => {
  return (
    <View
      rounded="lg"
      bg="black"
      opacity={0.8}
      w={fullWidth - 40}
      px={3}
      py={4}>
      <Text color="white">{props.children}</Text>
    </View>
  );
};

export default Toast;
