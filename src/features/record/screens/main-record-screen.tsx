import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import MainLayout from '../../../components/layout/main-layout';
import {Text} from 'native-base';

type Props = {
  navigation: NavigationProp<any>;
};

const MainRecordScreen = ({}: Props) => {
  return (
    <MainLayout>
      <Text>Record</Text>
    </MainLayout>
  );
};

export default MainRecordScreen;
