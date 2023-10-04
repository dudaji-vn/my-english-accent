import {ChevronLeftIcon, DotIcon} from '../icons';
import {HStack, Heading} from 'native-base';
import React, {Key} from 'react';

import {COLORS} from '../../constants/design-system';
import {StyleSheet} from 'react-native';

type Props = {
  routes: String[];
};

export const NestedHeader = ({routes}: Props) => {
  return (
    <HStack
      style={styles.container}
      px={4}
      alignItems={'center'}
      bg="white"
      space={2}>
      <ChevronLeftIcon />
      {routes.map((route, index) => (
        <React.Fragment key={route as Key}>
          <Heading
            color={COLORS.text}
            style={[styles.fontSizes, {opacity: index === 0 ? 0.3 : 1}]}>
            {route}
          </Heading>
          {index === 0 && <DotIcon />}
        </React.Fragment>
      ))}
    </HStack>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
  },
  fontSizes: {
    fontSize: 22,
  },
});
