import {VStack, View} from 'native-base';
import {ReactNode} from 'react';
import {COLORS} from '../../constants/design-system';
import {Dimensions} from 'react-native';
// import {ChevronLeftIcon, DotIcon} from '../icons';
const fullHeight = Dimensions.get('window').height;
interface IScreenWrapper {
  children: ReactNode;
}
const ScreenWrapper = (props: IScreenWrapper) => {
  const {children} = props;
  return (
    <VStack height={fullHeight} paddingX={5} paddingY={4} bg={'#FFF'}>
      {children}
    </VStack>
  );
};

export default ScreenWrapper;
