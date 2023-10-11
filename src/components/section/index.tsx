import {VStack} from 'native-base';
import {Text} from 'react-native';
import {COLORS} from '../../constants/design-system';

const Section = ({title, children}: {title: string; children: any}) => {
  return (
    <VStack space={2}>
      <Text bold color={COLORS.text}>
        {title}
      </Text>
      {children}
    </VStack>
  );
};
export default Section;
