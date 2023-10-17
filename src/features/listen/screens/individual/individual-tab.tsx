import {useQuery} from '@tanstack/react-query';
import {HStack, View} from 'native-base';
import {memo} from 'react';
import {listenService} from '../../../../services/listen.service';
import FilterListen from '../../components/FilterListen';
import ListUser from '../../components/ListUser';

const IndividualTab = () => {
  const {data: userProgress, error} = useQuery({
    queryKey: ['listen-user-progress'],
    queryFn: listenService.getUserProgress,
  });

  return (
    <View marginX={5} marginTop={5}>
      <HStack space={2} marginBottom={5}>
        <FilterListen />
      </HStack>
      {userProgress && <ListUser users={userProgress} />}
    </View>
  );
};

export default memo(IndividualTab);
