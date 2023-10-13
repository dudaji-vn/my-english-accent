import {Text, View, Button, HStack} from 'native-base';
import React from 'react';
import {COLORS} from '../../../../constants/design-system';
import HomeIcon from '../../../../components/icons/home-icon';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from '../../../../constants/screen';
import AddIcon from '../../../../components/icons/add-icon';

const GroupNotFound = () => {
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
          Hmm...
        </Text>
        <Text textAlign={'center'}>You haven’t joined any group yet.</Text>
        <Text textAlign={'center'}>
          Ask your supervisor to join one. Or create your own group.
        </Text>
      </View>
      <Button
        onPress={handleClick}
        marginBottom={5}
        borderWidth={1}
        borderColor={COLORS.highlight}
        width={'100%'}
        height={14}
        _pressed={{bg: '#E6E6E6'}}
        bg={COLORS.background}>
        <HStack space={2}>
          <AddIcon />
          <Text color={COLORS.highlight}>Create new group</Text>
        </HStack>
      </Button>
    </View>
  );
};

export default GroupNotFound;
