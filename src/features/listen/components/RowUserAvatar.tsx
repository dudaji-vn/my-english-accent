import {HStack, Text, View} from 'native-base';
import React from 'react';

import {StyleSheet} from 'react-native';
import UserAvatar from '../../../components/user-avatar';
import {COLORS} from '../../../constants/design-system';

import {IUser} from '../../../interfaces/api/User';
import {capitalizeFirstLetter} from '../../../utils/string';

interface IRowUserAvatarProps {
  user: IUser;
  isHighLightName?: boolean;
}
const RowUserAvatar = (props: IRowUserAvatarProps) => {
  const {user, isHighLightName} = props;
  return (
    <HStack space={4} alignItems={'center'}>
      <UserAvatar imageUrl={user.avatar} nativeLanguage={user.nativeLanguage} />
      <View>
        <Text
          style={[
            styles.textName,
            isHighLightName && {color: COLORS.highlight},
          ]}>
          {user.displayName}
        </Text>
        <Text opacity={0.4} fontWeight={'400'} style={styles.textRole}>
          {capitalizeFirstLetter(user.role)}
        </Text>
      </View>
    </HStack>
  );
};

const styles = StyleSheet.create({
  textName: {
    color: COLORS.text,
    fontWeight: '500',
    fontSize: 16,
  },
  textRole: {
    color: COLORS.text,
    fontWeight: '300',
    fontSize: 16,
  },
});

export default RowUserAvatar;
