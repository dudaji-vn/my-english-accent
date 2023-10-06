import {
  Avatar,
  Button,
  ChevronRightIcon,
  HStack,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base';

import {AppSetting} from '../components/app-setting';
import {COLORS} from '../../../constants/design-system';
import {DataAndStorage} from '../components/data-storage';
import React from 'react';
import {SCREEN_NAMES} from '../../../constants/screen';
import {SettingButton} from '../components/setting-button';
import {StyleSheet} from 'react-native';

const SettingsScreen = ({navigation}: any) => {
  return (
    <ScrollView bgColor="white" height="full" px={4}>
      <VStack space={8}>
        <VStack space={4}>
          <HStack alignItems="center" space={4}>
            <Avatar bg="blue.500" style={styles.avatar} />
            <Text fontSize="md" bold>
              Nguyen Minh Nhat
            </Text>
          </HStack>
          <SettingButton
            title="Edit Profile"
            onPress={() => {
              navigation.navigate(SCREEN_NAMES.settingsNavigator, {
                screen: SCREEN_NAMES.settingsProfile,
              });
            }}
            leftElement={<ChevronRightIcon />}
          />
        </VStack>
        <AppSetting />
        <DataAndStorage />
        <Button
          borderColor={COLORS.highlight}
          size="lg"
          variant="outline"
          rounded="md">
          <Text color={COLORS.highlight}>Sign out</Text>
        </Button>
        <View width="full" bg="black" mb={24} />
      </VStack>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
  },
  btn: {
    backgroundColor: COLORS.background,
    height: 56,
    borderRadius: 8,
    padding: 16,
  },
  questionIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
