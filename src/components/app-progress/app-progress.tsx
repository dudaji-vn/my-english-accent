import {HStack, Progress, Text, VStack, View} from 'native-base';
import React from 'react';
import {COLORS} from '../../constants/design-system';

type Props = {
  startIcon?: React.ReactNode;
  progress?: number;
};

export const AppProgress = (props: Props) => {
  return (
    <HStack w="full" space={3}>
      <View rounded="full" bg="highlight" p={2}>
        {props.startIcon}
      </View>
      <VStack flex={1} justifyContent="space-between">
        <Text>
          Your progress:
          <Text color={COLORS.highlight} fontWeight="bold">
            {' '}
            {props.progress}%
          </Text>
        </Text>
        <Progress
          _filledTrack={{
            bg: 'highlight',
          }}
          value={props.progress}
        />
      </VStack>
    </HStack>
  );
};
