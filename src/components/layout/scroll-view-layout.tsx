import {ScrollView, View} from 'native-base';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const ScrollViewLayout = (props: Props) => {
  return (
    <ScrollView paddingX={5} paddingY={4} bgColor="white" height="full" px={5}>
      {props.children}
      <View width="full" bg="black" mb={24} />
    </ScrollView>
  );
};

export default ScrollViewLayout;
