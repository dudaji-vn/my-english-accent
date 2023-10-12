import {HStack, View, Text} from 'native-base';
import React from 'react';

import UserAvatar from '../../../components/user-avatar';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/design-system';

const RowUserAvatar = () => {
  return (
    <HStack space={4} alignItems={'center'}>
      <UserAvatar nation="ko" />
      <View>
        <Text style={styles.textName}>Display name</Text>
        <Text opacity={0.4} fontWeight={'400'} style={styles.textRole}>
          Position
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
