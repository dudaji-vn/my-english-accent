import {NavigationProp} from '@react-navigation/native';
import {HStack, Pressable, Text} from 'native-base';

import {ChevronLeft, ChevronRight, X} from 'react-native-feather';
import {COLORS} from '../../../constants/design-system';

const HeaderSwiper = ({
  currentIdx = 0,
  navigation,
  total,
  forward,
  backward,
}: {
  currentIdx?: number;
  navigation: NavigationProp<any>;
  total: number;
  forward: () => void;
  backward: () => void;
}) => {
  return (
    <HStack space={8}>
      <Pressable p={4} m={-4} onPress={backward}>
        <ChevronLeft width={24} height={24} color={COLORS.text} />
      </Pressable>
      <HStack>
        <Text fontWeight="medium" opacity={0.6} color={COLORS.text}>
          {currentIdx + 1}
        </Text>
        <Text fontWeight="medium" opacity={0.3}>
          /{total}
        </Text>
      </HStack>
      <Pressable p={8} m={-8} onPress={forward}>
        <ChevronRight width={24} height={24} color={COLORS.text} />
      </Pressable>
    </HStack>
  );
};

export default HeaderSwiper;
