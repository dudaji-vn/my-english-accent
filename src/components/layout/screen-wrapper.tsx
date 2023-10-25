import {VStack} from 'native-base';
import {ReactNode} from 'react';
import {Dimensions} from 'react-native';
// import {ChevronLeftIcon, DotIcon} from '../icons';
const fullHeight = Dimensions.get('window').height;
interface IScreenWrapper {
  children: ReactNode;
  bg?: string;
}
const ScreenWrapper = (props: IScreenWrapper) => {
  const {children, bg} = props;
  return (
    <VStack
      {...props}
      height={fullHeight}
      paddingX={5}
      paddingY={4}
      bg={bg || '#FFF'}>
      {children}
    </VStack>
  );
};

export default ScreenWrapper;
