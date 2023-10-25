import {useQuery} from '@tanstack/react-query';
import {HStack, View, VStack} from 'native-base';
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
    <View marginX={5} marginTop={5} flex={1}>
      <HStack space={2} marginBottom={5}>
        <FilterListen />
      </HStack>

      {userProgress && (
        <VStack mb={20} flex={1}>
          <ListUser users={userProgress} />
        </VStack>
      )}
    </View>
  );
};

export default memo(IndividualTab);
