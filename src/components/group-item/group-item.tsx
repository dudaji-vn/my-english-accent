import {Avatar, HStack, VStack, View} from 'native-base';
import React from 'react';
import {Group} from '../../types/group';
import {Text600} from '../text-600';

type Props = {
  group: Group;
  rightElement?: React.ReactNode;
};
export const GroupItem = ({group, rightElement}: Props) => {
  const renderAvatar = () => {
    if (group.avatar) {
      return <Avatar source={{uri: group.avatar}} />;
    }
    return <Avatar>{group.name[0]}</Avatar>;
  };

  return (
    <HStack space={4}>
      {renderAvatar()}
      <VStack alignSelf="center" space={1}>
        <Text600>{group.name}</Text600>
        <Text600
          style={{
            fontWeight: '300',
          }}>
          {group.members.length} members
        </Text600>
      </VStack>
      <View flex={1} />
      {rightElement}
    </HStack>
  );
};
