import {Button, HStack, Image, Pressable, Text, View} from 'native-base';
import React from 'react';
import {COLORS} from '../../constants/design-system';
import {useNavigation} from '@react-navigation/native';
import {X} from 'react-native-feather';
import {useWindowDimensions} from 'react-native';

type Props = {
  header?: React.ReactNode;
  imageSource: any;
  title: string | React.ReactNode;
  subTitle: string | React.ReactNode;
  children: React.ReactNode;
  subTitle2?: string;
};

export const PermissionScreen = ({
  imageSource,
  title,
  subTitle,
  subTitle2,
  children,
}: Props) => {
  const navigation = useNavigation();
  const windowHeight = useWindowDimensions().height;
  return (
    <View>
      <HStack h={14} alignItems="center" justifyContent="space-between">
        <Pressable
          p={5}
          onPress={() => {
            navigation.goBack();
          }}>
          <X width={24} height={24} color={COLORS.text} />
        </Pressable>
      </HStack>
      <View
        pb={31}
        style={{
          height: windowHeight - 56,
        }}
        px={5}
        justifyContent="center"
        alignItems="center">
        <Image w={200} h={200} source={imageSource} />
        <Text
          mt={5}
          mb={3}
          fontSize="xl"
          fontWeight="medium"
          color={COLORS.highlight}>
          {title}
        </Text>
        {subTitle && <Text textAlign="center">{subTitle}</Text>}
        {children}
        {subTitle2 && <Text textAlign="center">{subTitle2}</Text>}
        <Button w="full" onPress={() => navigation.goBack()} mt={10}>
          Go to settings
        </Button>
      </View>
    </View>
  );
};
