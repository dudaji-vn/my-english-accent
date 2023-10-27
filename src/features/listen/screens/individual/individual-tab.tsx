import {useQuery} from '@tanstack/react-query';
import {View, VStack, HStack} from 'native-base';
import React, {memo, useMemo, useState} from 'react';
import {listenService} from '../../../../services/listen.service';
import ListUser from '../../components/ListUser';
import NotFoundFavorite from '../favorite/not-found-favorite';
import {LoadingScreen} from '../../../../components/screens';
import FilterListen from '../../components/FilterListen';

const IndividualTab = ({isFavorite}: {isFavorite?: boolean}) => {
  const {
    data: items,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['listen-user-progress'],
    queryFn: () => listenService.getUserProgress(),
  });
  const [filter, setFilter] = useState('');
  const userProgressFilter = useMemo(() => {
    if (!items) {
      return [];
    }
    switch (filter) {
      case 'a-z':
        // Implement your A-Z sorting logic here
        return items.sort((a, b) => a.displayName.localeCompare(b.displayName));
      case 'z-a':
        // Implement your Z-A sorting logic here
        return items.sort((a, b) => b.displayName.localeCompare(a.displayName));
      case 'position=designer':
        return items.filter(item => item.role === 'designer');
      case 'position=developers':
        return items.filter(item => item.role === 'developer');
      case 'position=others':
        return items.filter(item => item.role === 'others');

      default:
        return items;
    }
  }, [filter, items?.length]);

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <View marginX={5} marginTop={5} flex={1}>
      <HStack space={2} marginBottom={5}>
        <FilterListen
          onSelected={data => {
            setFilter(data.value);
          }}
        />
      </HStack>

      {userProgressFilter && (
        <VStack mb={24} flex={1}>
          <ListUser users={userProgressFilter} />
        </VStack>
      )}
    </View>
  );
};

export default IndividualTab;
