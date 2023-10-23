import {Text, View, Button, HStack, AddIcon} from 'native-base';
import React, {memo} from 'react';

import {useNavigation} from '@react-navigation/native';
import HomeIcon from '../../../components/icons/home-icon';
import {COLORS} from '../../../constants/design-system';
import {SCREEN_NAMES} from '../../../constants/screen';
import NotInternetIcon from '../../../components/icons/not-internet-icon';

const NotInternet = () => {
  const navigation = useNavigation<any>();
  const handleClick = () => {
    navigation.navigate(SCREEN_NAMES.listeningsNavigator, {
      screen: SCREEN_NAMES.createGroup,
    });
  };
  return (
    <View marginX={5} alignItems={'center'}>
      <NotInternetIcon />
      <View marginX={18} marginBottom={10}>
        <Text
          textAlign={'center'}
          marginTop={5}
          marginBottom={3}
          fontSize={20}
          fontWeight={'500'}
          color={COLORS.highlight}>
          No internet connection
        </Text>
        <Text textAlign={'center'}>
          Please change to Download section to view downloaded files.
        </Text>
      </View>
    </View>
  );
};

export default memo(NotInternet);
