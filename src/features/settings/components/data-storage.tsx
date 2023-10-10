import {
  Box,
  ChevronRightIcon,
  HStack,
  Progress,
  Text,
  VStack,
  View,
} from 'native-base';
import {StorageInfo, formatStorageUnit} from '../utils/format-storage-unit';
import {
  getFreeDiskStorage,
  getTotalDiskCapacity,
  getUsedMemory,
} from 'react-native-device-info';

import {COLORS} from '../../../constants/design-system';
import React from 'react';
import {SettingButton} from './setting-button';
import {SettingSection} from './setting-section';
import {openDownloadsDirectory} from '../utils/open-download-folder';

type DeviceStorage = {
  total: StorageInfo;
  free: StorageInfo;
  used: StorageInfo;
  percentUsed: number;
};
const emptyStorage = formatStorageUnit(0);

export const DataAndStorage = () => {
  const [deviceStorage, setDeviceStorage] = React.useState<DeviceStorage>({
    total: emptyStorage,
    free: emptyStorage,
    used: emptyStorage,
    percentUsed: 0,
  });
  React.useEffect(() => {
    const getStorage = async () => {
      const total = await getTotalDiskCapacity();
      const free = await getFreeDiskStorage();
      const used = await getUsedMemory();
      setDeviceStorage({
        total: formatStorageUnit(total),
        free: formatStorageUnit(free),
        used: formatStorageUnit(used),
        percentUsed: (used / total) * 100,
      });
    };
    getStorage();
  }, []);
  return (
    <SettingSection
      title="Data and Storage
        ">
      <VStack space={4}>
        <VStack space={2}>
          <Box w="100%">
            <Progress
              _filledTrack={{
                bg: COLORS.highlight,
              }}
              bgColor={COLORS.darkerBackground}
              value={deviceStorage.percentUsed}
            />
          </Box>
          <HStack justifyContent="space-between">
            <Text fontSize="md" color={COLORS.highlight}>
              {deviceStorage.used.value} {deviceStorage.used.unit}
            </Text>
            <Text fontSize="md" color={COLORS.text}>
              {deviceStorage.total.value} {deviceStorage.total.unit}
            </Text>
          </HStack>
        </VStack>
        <HStack justifyContent="space-between">
          <HStack alignItems="center" justifyContent="center" space={2}>
            <View
              width={2}
              height={2}
              rounded="full"
              bgColor={COLORS.highlight}
            />
            <Text fontSize="md" color={COLORS.text}>
              App usage
            </Text>
          </HStack>
          <HStack alignItems="center" justifyContent="center" space={2}>
            <View
              width={2}
              height={2}
              rounded="full"
              bgColor={COLORS.darkerBackground}
            />
            <Text fontSize="md" color={COLORS.text}>
              Device storage
            </Text>
          </HStack>
        </HStack>
        <SettingButton
          title="Manage downloaded files"
          onPress={openDownloadsDirectory}
          leftElement={<ChevronRightIcon />}
        />
      </VStack>
    </SettingSection>
  );
};
