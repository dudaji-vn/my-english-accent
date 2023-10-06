import {Heading, VStack} from 'native-base';

import {COLORS} from '../../../constants/design-system';
import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

export const SettingSection = ({title, children}: Props) => {
  return (
    <VStack space={4}>
      <Heading color={COLORS.text} fontSize="md">
        {title}
      </Heading>
      {children}
    </VStack>
  );
};
