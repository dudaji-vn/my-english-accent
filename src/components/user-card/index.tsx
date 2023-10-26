import {Avatar, HStack, Pressable, Progress, View} from 'native-base';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS} from '../../constants/design-system';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from '../../constants/screen';
import HeadPhoneListenIcon from '../icons/headphone-listen-icon';

import {flagMap} from '../../configs';
import {IUserProgress} from '../../interfaces/api/User';
import {capitalizeFirstLetter} from '../../utils/string';
import {Headphones} from 'react-native-feather';

interface IUserCardProps {
  userProgress: IUserProgress;
}
const UserCard = (props: IUserCardProps) => {
  const {userProgress} = props;
  const navigation = useNavigation<any>();

  const handleClick = () => {
    navigation.navigate(SCREEN_NAMES.listeningsNavigator, {
      screen: SCREEN_NAMES.listenDetailScreen,
      params: {typeScreen: 'user', user: userProgress},
    });
  };
  return (
    <Pressable onPress={handleClick} style={styles.container}>
      <View style={styles.avatar}>
        <Avatar
          width={15}
          height={15}
          source={{
            uri: userProgress?.avatar,
          }}>
          {userProgress?.displayName}
        </Avatar>
        <Avatar
          width={6}
          height={6}
          style={styles.flag}
          source={flagMap[userProgress.nativeLanguage]?.src!}
        />
      </View>

      <Text style={styles.textName}>
        {capitalizeFirstLetter(userProgress?.displayName)}
      </Text>
      <Text style={styles.textRole}>
        {capitalizeFirstLetter(userProgress?.role)}
      </Text>
      <Text style={styles.textSentences}>
        {userProgress?.totalRecord} sentences
      </Text>
      <HStack space={2} width={'100%'} alignItems={'center'}>
        <View rounded="full" p={1} bg={'#d4d4d4'}>
          <Headphones width={16} height={16} color="white" />
        </View>
        <Progress
          flex={1}
          _filledTrack={{
            bg: COLORS.highlight,
          }}
          value={Math.round(
            (userProgress?.totalListen * 100) / userProgress?.totalRecord,
          )}
        />
      </HStack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lighterBackground,
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
    marginBottom: 4,
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
    lineHeight: 24,
  },
});
export default UserCard;
