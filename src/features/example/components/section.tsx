import {Text, VStack} from 'native-base';
import {COLORS} from '../../../constants/design-system';

export const Section = ({title, children}: {title: string; children: any}) => {
  return (
    <VStack space={2}>
      <Text bold color={COLORS.text}>
        {title}
      </Text>
      {children}
    </VStack>
  );
};
