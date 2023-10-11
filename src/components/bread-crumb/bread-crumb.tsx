import {HStack, Pressable} from 'native-base';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {DotIcon, ChevronLeftIcon} from '../icons';
import {COLORS, OPACITY} from '../../constants/design-system';
import {useNavigation} from '@react-navigation/native';

interface IBreadCrumbProps {
  parentTitle: string;
  mainTitle: string;
}
const BreadCrumb = (props: IBreadCrumbProps) => {
  const {parentTitle, mainTitle} = props;
  const navigation = useNavigation();
  return (
    <HStack space={2} alignItems={'center'}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
        <ChevronLeftIcon />
      </Pressable>
      <Text style={[styles.parentTitle, styles.title]}>{parentTitle}</Text>
      <DotIcon />
      <Text style={styles.title}>{mainTitle}</Text>
    </HStack>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.text,
  },
  parentTitle: {
    opacity: OPACITY.low,
  },
});

export default BreadCrumb;
