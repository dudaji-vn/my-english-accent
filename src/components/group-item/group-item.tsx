import {Avatar, HStack, VStack, View} from 'native-base';
import React from 'react';
import {Group} from '../../types/group';
import {Text600} from '../text-600';

type Props = {
  group: Group;
  rightElement?: React.ReactNode;
};

export const GroupItem = ({group, rightElement}: Props) => {
  return (
    <HStack space={4}>
      {group.avatar ? (
        <Avatar w={15} h={15} source={{uri: group.avatar}} />
      ) : (
        <Avatar w={15} h={15}>
          {group.name[0]}
        </Avatar>
      )}
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
