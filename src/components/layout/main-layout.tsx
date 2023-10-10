import {ScrollView, View} from 'native-base';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const MainLayout = (props: Props) => {
  return (
    <ScrollView bgColor="white" height="full" px={4}>
      {props.children}
      <View width="full" bg="black" mb={24} />
    </ScrollView>
  );
};

export default MainLayout;
