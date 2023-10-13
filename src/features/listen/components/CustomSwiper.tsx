import {Image, StyleSheet, View, Text} from 'react-native';
import Swiper, {SwiperProps} from 'react-native-swiper';
import {SwiperPagination} from '../../../components/swiper/swiper-pagination';
import {ChevronLeft, ChevronRight} from 'react-native-feather';
import {COLORS} from '../../../constants/design-system';

interface ICustomSwiper extends SwiperProps {
  children: React.ReactNode;
}
const CustomSwiper = (props: ICustomSwiper) => {
  const {children} = props;
  return (
    <Swiper
      renderPagination={(index, total, context) => (
        <SwiperPagination
          index={index}
          total={total}
          context={context}
          visitedIndexes={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
        />
      )}
      style={styles.wrapper}
      showsPagination={true}>
      {children}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomSwiper;
