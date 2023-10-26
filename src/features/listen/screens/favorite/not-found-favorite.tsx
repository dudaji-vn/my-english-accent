import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'native-base';
import React, {memo} from 'react';
import HomeIcon from '../../../../components/icons/home-icon';
import {COLORS} from '../../../../constants/design-system';
import {SCREEN_NAMES} from '../../../../constants/screen';

const NotFoundFavorite = () => {
  const navigation = useNavigation<any>();
  const handleClick = () => {
    navigation.navigate(SCREEN_NAMES.listeningsNavigator, {
      screen: SCREEN_NAMES.createGroup,
    });
  };
  return (
    <View marginX={5} alignItems={'center'}>
      <HomeIcon />
      <View marginX={18} marginBottom={10}>
        <Text
          textAlign={'center'}
          marginTop={5}
          marginBottom={3}
          fontSize={20}
          fontWeight={'500'}
          color={COLORS.highlight}>
          List empty
        </Text>
        <Text textAlign={'center'}>Mark a person by “Add to favorite”,</Text>
        <Text textAlign={'center'}>and they will show up here.</Text>
      </View>
    </View>
  );
};

export default memo(NotFoundFavorite);
