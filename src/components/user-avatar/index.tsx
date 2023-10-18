import {Avatar, View} from 'native-base';
import {InterfaceAvatarProps} from 'native-base/lib/typescript/components/composites/Avatar/types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {flagMap} from '../../configs';
import {Language} from '../../types/user';

interface IUserAvatarProps extends InterfaceAvatarProps {
  nativeLanguage?: Language;
  imageUrl?: string;
  flagWidth?: number;
}
const UserAvatar = (props: IUserAvatarProps) => {
  const {nativeLanguage, imageUrl, flagWidth} = props;
  return (
    <View style={styles.avatar}>
      <Avatar
        width={15}
        height={15}
        source={{
          uri: imageUrl,
        }}
        {...props}></Avatar>
      {nativeLanguage && (
        <Avatar
          width={flagWidth || 6}
          height={flagWidth || 6}
          style={styles.flag}
          source={flagMap[nativeLanguage]}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  avatar: {
    position: 'relative',
  },
  avatarImage: {},
  flag: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default UserAvatar;
