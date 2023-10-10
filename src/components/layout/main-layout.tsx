import {View} from 'native-base';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const MainLayout = (props: Props) => {
  return (
    <View bgColor="white" height="full" px={4}>
      {props.children}
    </View>
  );
};

export default MainLayout;
