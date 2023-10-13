import {Avatar, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

interface IUserAvatarProps {
  nation: 'ko' | 'vi';
  imageUrl?: string;
}
const UserAvatar = (props: IUserAvatarProps) => {
  const {nation, imageUrl} = props;
  return (
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
        source={
          nation === 'ko'
            ? require('../../assets/images/KoreanFlagIcon.png')
            : require('../../assets/images/VietNamFlagIcon.png')
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  avatar: {
    position: 'relative',
    width: 60,
    height: 60,
  },
  avatarImage: {},
  flag: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default UserAvatar;
