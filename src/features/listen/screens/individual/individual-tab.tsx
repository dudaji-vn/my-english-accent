import {HStack, Text, View} from 'native-base';
import {FilterIcon} from '../../../../components/icons/filter-icon';
import ListUser from '../../components/ListUser';
import Section from '../../../../components/section';
import {Filter} from '../../../../components/filter';
import FilterListen from '../../components/FilterListen';

const IndividualTab = () => {
  return (
    <View marginX={5} marginTop={5}>
      <HStack space={2} marginBottom={5}>
        <FilterListen />
      </HStack>
      <ListUser />
    </View>
  );
};

export default IndividualTab;
