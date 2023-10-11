import {Avatar, HStack, Pressable, Progress, View} from 'native-base';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS} from '../../constants/design-system';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from '../../constants/screen';
import HeadPhoneListenIcon from '../icons/headphone-listen-icon';

const UserCard = () => {
  const navigation = useNavigation<any>();
  const handleClick = () => {
    navigation.navigate(SCREEN_NAMES.listeningsNavigator, {
      screen: SCREEN_NAMES.individualDetail,
    });
  };
  return (
    <Pressable onPress={handleClick} style={styles.container}>
      <View style={styles.avatar}>
        <Avatar
          width={15}
          height={15}
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}>
          AJ
        </Avatar>
        <Avatar
          width={6}
          height={6}
          style={styles.flag}
          source={require('../../assets/images/KoreanFlagIcon.png')}
        />
      </View>

      <Text style={styles.textName}>Display name</Text>
      <Text style={styles.textRole}>Position</Text>
      <Text style={styles.textSentences}>12 sentences1</Text>
      <HStack space={2} width={'100%'} alignItems={'center'}>
        <HeadPhoneListenIcon />
        <Progress
          flex={1}
          _filledTrack={{
            bg: COLORS.highlight,
          }}
          value={40}
        />
      </HStack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lighterBackground,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#161616',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  avatar: {
    position: 'relative',
    marginBottom: 8,
  },
  avatarImage: {},
  flag: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  textName: {
    color: COLORS.darkColor,
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 8,
  },
  textRole: {
    color: COLORS.darkColor,
    fontWeight: '300',
    fontSize: 16,
    marginBottom: 20,
  },
  textSentences: {
    color: COLORS.text,
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 20,
  },
});
export default UserCard;
