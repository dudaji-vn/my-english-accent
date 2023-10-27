import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'native-base';
import React, {memo} from 'react';
import HomeIcon from '../../../../components/icons/home-icon';
import {COLORS} from '../../../../constants/design-system';
import {SCREEN_NAMES} from '../../../../constants/screen';
import {EmptyData} from '../../../../components/empty-data';

const NotFoundFavorite = () => {
  const navigation = useNavigation<any>();
  const handleClick = () => {
    navigation.navigate(SCREEN_NAMES.listeningsNavigator, {
      screen: SCREEN_NAMES.createGroup,
    });
  };
  return (
    <EmptyData mt={32} title=" List empty">
      <Text textAlign={'center'}>Mark a person by “Add to favorite”,</Text>
      <Text textAlign={'center'}>and they will show up here.</Text>
    </EmptyData>
  );
};

export default memo(NotFoundFavorite);
