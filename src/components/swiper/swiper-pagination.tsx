import React from 'react';

import {HStack, View} from 'native-base';
import {Animated} from 'react-native';
import {COLORS} from '../../constants/design-system';
const DOT_WIDTH = 10;
const DOT_MARGIN = 4;

type Props = {
  visitedIndexes: number[];
  maxDots?: number;
  index: number;
  total: number;
  context: any;
};
type DotStatus = 'active' | 'inactive' | 'visited';
const Dot = ({
  onPress,
  status = 'inactive',
}: {
  onPress?: () => void;
  status?: DotStatus;
}) => {
  const color = React.useMemo(() => {
    switch (status) {
      case 'active':
        return COLORS.stroke;
      case 'visited':
        return COLORS.highlight;
      default:
        return COLORS.stroke;
    }
  }, [status]);
  return (
    <View
      onTouchEnd={onPress}
      opacity={status === 'inactive' ? 0.3 : 1}
      w={2.5}
      h={2.5}
      rounded="full"
      bg={color}
    />
  );
};

export const SwiperPagination = ({
  visitedIndexes,
  total,
  index,
  context,
  maxDots = 10,
}: Props) => {
  const positionLeft = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    let toValue = index === 0 ? 0 : index * (DOT_WIDTH + DOT_MARGIN);
    if (total - index <= maxDots) {
      toValue = (total - maxDots) * (DOT_WIDTH + DOT_MARGIN);
    }
    Animated.timing(positionLeft, {
      toValue: -toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [index, maxDots, positionLeft, total]);

  return (
    <View
      w={DOT_WIDTH * maxDots + DOT_MARGIN * maxDots}
      overflow={'hidden'}
      alignSelf="center"
      bottom={12}
      position="absolute">
      <Animated.View
        style={{
          transform: [{translateX: positionLeft}],
        }}>
        <HStack space={1}>
          {Array.from({length: total}).map((_, i) => {
            let status: DotStatus = 'inactive';
            if (visitedIndexes.includes(i)) {
              status = 'visited';
            }
            if (i === index) {
              status = 'active';
            }
            return (
              <Dot
                key={i}
                status={status}
                onPress={() => context?.scrollTo?.(i)}
              />
            );
          })}
        </HStack>
      </Animated.View>
    </View>
  );
};
