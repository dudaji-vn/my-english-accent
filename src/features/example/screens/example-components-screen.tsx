import {View} from 'native-base';
import Section from '../../../components/section';
import {SwipeableSection} from '../section/swipeable';

const ExampleComponentsScreen = ({}: Props) => {
  return (
    <View>
      <Section title="Swipeable">
        <SwipeableSection />
      </Section>
    </View>
  );
};

export default ExampleComponentsScreen;
