import {Avatar, HStack, Text, VStack, View} from 'native-base';
import React from 'react';
import {Group} from '../../types/group';
import {Text600} from '../text-600';
import {COLORS} from '../../constants/design-system';

type Props = {
  group: Group;
  rightElement?: React.ReactNode;
};
export const GroupItem = ({group, rightElement}: Props) => {
  const renderAvatar = () => {
    if (group.avatar) {
      return <Avatar source={{uri: group.avatar}} />;
    }
    const numOfMembers = group.members.length;
    switch (numOfMembers) {
      case 1:
        return <Avatar>{group.name[0]}</Avatar>;
      case 2:
        return (
          <HStack
            w={15}
            space={1}
            h={15}
            justifyContent="center"
            alignItems="center">
            <Avatar
              height={7}
              width={7}
              source={{uri: group.members[0].avatar}}
            />
            <Avatar
              height={7}
              width={7}
              source={{uri: group.members[1].avatar}}
            />
          </HStack>
        );
      case 3:
        return (
          <VStack
            w={15}
            space={1}
            h={15}
            justifyContent="center"
            alignItems="center">
            <Avatar
              height={7}
              width={7}
              source={{uri: group.members[0].avatar}}
            />
            <HStack space={1}>
              <Avatar
                height={7}
                width={7}
                source={{uri: group.members[1].avatar}}
              />
              <Avatar
                height={7}
                width={7}
                source={{uri: group.members[2].avatar}}
              />
            </HStack>
          </VStack>
        );
      case 4:
        return (
          <VStack
            w={15}
            space={1}
            h={15}
            justifyContent="center"
            alignItems="center">
            <HStack space={1}>
              <Avatar
                height={7}
                width={7}
                source={{uri: group.members[0].avatar}}
              />
              <Avatar
                height={7}
                width={7}
                source={{uri: group.members[1].avatar}}
              />
            </HStack>
            <HStack space={1}>
              <Avatar
                height={7}
                width={7}
                source={{uri: group.members[2].avatar}}
              />
              <Avatar
                height={7}
                width={7}
                source={{uri: group.members[3].avatar}}
              />
            </HStack>
          </VStack>
        );
      default:
        return (
          <VStack
            w={15}
            space={1}
            h={15}
            justifyContent="center"
            alignItems="center">
            <HStack space={1}>
              <Avatar
                height={7}
                width={7}
                source={{uri: group.members[0].avatar}}
              />
              <Avatar
                height={7}
                width={7}
                source={{uri: group.members[1].avatar}}
              />
            </HStack>
            <HStack space={1}>
              <Avatar
                height={7}
                width={7}
                source={{uri: group.members[2].avatar}}
              />
              <Avatar
                background={COLORS.highlight}
                justifyContent="center"
                alignItems="center"
                height={7}
                width={7}>
                <Text color="white" fontSize="xs" textAlign="center">
                  +{numOfMembers - 3}
                </Text>
              </Avatar>
            </HStack>
          </VStack>
        );
    }
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
