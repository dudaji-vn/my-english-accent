import {ChevronLeftIcon, DotIcon} from '../icons';
import {HStack, Heading} from 'native-base';
import React, {Key} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {COLORS} from '../../constants/design-system';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

type Props = {
  routes: {
    name: string;
    displayName: string;
  }[];
} & NativeStackHeaderProps;

export const NestedHeader = ({routes, navigation}: Props) => {
  return (
    <HStack
      style={styles.container}
      px={4}
      alignItems={'center'}
      bg="white"
      space={2}>
      <TouchableOpacity onPress={navigation.goBack}>
        <ChevronLeftIcon />
      </TouchableOpacity>
      {routes.map((route, index) => (
        <React.Fragment key={route.name as Key}>
          <Heading
            onPress={() => navigation.goBack()}
            color={COLORS.text}
            style={[
              styles.fontSizes,
              index === routes.length - 1 ? null : styles.textOpacity,
            ]}>
            {route.displayName}
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
  textOpacity: {
    opacity: 0.3,
  },
});
