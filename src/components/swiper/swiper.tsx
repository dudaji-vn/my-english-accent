import React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {ChevronLeft, ChevronRight} from 'react-native-feather';
import RNSwiper from 'react-native-swiper';
import {COLORS} from '../../constants/design-system';
import {SwiperPagination} from './swiper-pagination';

const styles = StyleSheet.create({
  wrapper: {},
  buttonWrapperStyle: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 32,
    alignItems: 'flex-end',
    paddingBottom: 40,
  },
  paginationStyle: {
    overflow: 'hidden',
    bottom: 40,
  },
});
type Props = {
  numOfWords: number;
  children?: React.ReactNode;
};
const DOT_WIDTH = 10;
const DOT_MARGIN = 4;
const SPACE_CONTROL_BUTTON_TO_DOT = 32;
export const Swiper = ({numOfWords, children}: Props) => {
  const spaceControlButton =
    numOfWords * DOT_WIDTH +
    (numOfWords - 1) * DOT_MARGIN +
    SPACE_CONTROL_BUTTON_TO_DOT * 2;

  const width = useWindowDimensions().width;
  const paddingHorizontal = (width - spaceControlButton) / 2;
  return (
    <RNSwiper
      loop={false}
      prevButton={
        <ChevronLeft color={COLORS.text} opacity={0.1} width={24} height={24} />
      }
      nextButton={
        <ChevronRight
          color={COLORS.text}
          width={24}
          opacity={0.6}
          height={24}
        />
      }
      buttonWrapperStyle={[
        styles.buttonWrapperStyle,
        {paddingHorizontal: paddingHorizontal},
      ]}
      paginationStyle={[
        styles.paginationStyle,
        {
          width: numOfWords * DOT_WIDTH + (numOfWords - 1) * DOT_MARGIN,
          left: paddingHorizontal + SPACE_CONTROL_BUTTON_TO_DOT,
        },
      ]}
      renderPagination={(index, total, context) => (
        <SwiperPagination
          index={index}
          total={total}
          context={context}
          visitedIndexes={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
        />
      )}
      style={styles.wrapper}
      showsButtons={true}>
      {children}
    </RNSwiper>
  );
};
