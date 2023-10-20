import {NavigationProp, RouteProp} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {FlatList, HStack, Spinner, VStack, View} from 'native-base';
import React from 'react';
import {RefreshControl} from 'react-native';
import {EmptyData} from '../../../components/empty-data';
import {Filter} from '../../../components/filter';
import {Input} from '../../../components/form';
import {Topic, TopicCard} from '../../../components/topic-card';
import {COLORS} from '../../../constants/design-system';
import {SCREEN_NAMES} from '../../../constants/screen';
import {useRootSelector} from '../../../redux/reducers';
import {recordService} from '../../../services/record.service';
import {GetRecordsParams, Record} from '../../../types/record';
import {useGetMyRecords} from '../hooks/use-get-my-records';
import {RecordItem} from './record-item';
import {SendAllButton} from './send-all';
import {useModal} from '../../../hooks/use-modal';
import {IPaginationResponse} from '../../../interfaces/api/Http';
import {ModalCardDelete} from '../../../components/modal-card';
import {Modal} from '../../../components/modal';
import {ShareModal} from '../../../components/share-modal';
const designerImg = require('../../../assets/images/Designer.png');

const generalImg = require('../../../assets/images/Chat.png');

const developerImg = require('../../../assets/images/Dev.png');

const filterItems = [
  {
    label: 'Type (verb)',
    value: 'type=Verb',
  },
  {
    label: 'Type (noun)',
    value: 'type=Noun',
  },
  {
    label: 'Type (place / time)',
    value: 'type=Place / Time',
  },
];

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
  jumpTo: (screen: string) => void;
};
const topics: Topic[] = [
  {
    _id: 'general',
    name: 'General',
    image: generalImg,
    description: 'General description',
    totalWords: 0,
    numOfAchieved: 0,
  },
  {
    _id: 'developer',
    name: 'Developer',
    image: developerImg,
    description: 'General description',
    totalWords: 0,
    numOfAchieved: 0,
  },
  {
    _id: 'designer',
    name: 'Designer',
    image: designerImg,
    description: 'General description',
    totalWords: 0,
    numOfAchieved: 0,
  },
];

const MyRecordList = ({navigation}: Props) => {
  const queryClient = useQueryClient();
  const [currentSelectedItemId, setCurrentSelectedItemId] =
    React.useState<Record | null>(null);
  const role = useRootSelector(state => state.user.profile?.role);
  const completedIds =
    useRootSelector(state => state.record)?.completedIds || [];
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [filter, setFilter] = React.useState<GetRecordsParams>({
    category: topics[0]._id,
    pageSize: 0,
    q: searchQuery,
  });
  const {data, isFetching, refetch, queryKey} = useGetMyRecords({
    ...filter,
    q: searchQuery,
  });

  const vocabularies = data?.items || [];
  const {data: progress, refetch: refetchProgress} = useQuery({
    queryKey: ['progress'],
    queryFn: recordService.getRecordProgress,
  });

  const handlePressItem = (record: Record) => {
    navigation.navigate(SCREEN_NAMES.recordNavigator, {
      screen: SCREEN_NAMES.myRecordListen,
      params: {
        record,
        refreshKey: queryKey,
      },
    });
  };
  const handleSelectedFilter = (value: string) => {
    if (!value) {
      setFilter({category: topics[0]._id});
      return;
    }
    const key = value.split('=')[0];
    const val = value.split('=')[1];
    setFilter(prev => ({...prev, [key]: val}));
  };

  const topicsShow = React.useMemo(() => {
    const result = [topics[0]];
    switch (role) {
      case 'designer':
        result.push(topics[2]);
        break;
      case 'developer':
        result.push(topics[1]);
        break;
      default:
        break;
    }
    return result.map(topic => ({
      ...topic,
      totalWords:
        progress?.recordProgress.find(item => item._id === topic._id)?.count ||
        0,
    }));
  }, [progress?.recordProgress, role]);

  const renderSeparator = () => <View h={5} />;

  React.useEffect(() => {
    refetch();
    refetchProgress();
  }, [completedIds, refetch, refetchProgress]);
  const {
    open: openDelete,
    close: closeDelete,
    isShowing: isShowingDelete,
  } = useModal();
  const {close, open, isShowing} = useModal();
  const {mutate: deleteRecord, isLoading: isLoadingDelete} = useMutation({
    mutationFn: recordService.deleteRecord,
    onSuccess: () => {
      closeDelete();
      queryClient.setQueryData<IPaginationResponse<Record> | undefined>(
        queryKey,
        old => {
          if (old) {
            return {
              ...old,
              items: old.items.filter(
                i => i._id !== currentSelectedItemId?._id,
              ),
              totalItems: old.totalItems - 1,
            };
          }
          return old;
        },
      );
      refetchProgress();
    },
  });

  return (
    <VStack flex={1} pt={5} px={5}>
      <Input
        value={searchQuery}
        onChangeText={setSearchQuery}
        typeInput="search"
      />
      <HStack space={4} mt={5} justifyContent="space-between">
        {topicsShow.map((topic, index) => (
          <TopicCard
            hideProgress
            onPress={() => handleSelectedFilter(`category=${topic._id}`)}
            isActive={filter.category === topic._id}
            key={index}
            topic={topic}
          />
        ))}
      </HStack>
      <HStack justifyContent="space-between" mt={5}>
        <Filter
          onSelected={value => handleSelectedFilter(value.value)}
          filterItems={filterItems}
        />
        <SendAllButton />
      </HStack>

      {isFetching && vocabularies.length === 0 ? (
        <Spinner mt={12} size="lg" color={COLORS.highlight} />
      ) : (
        <>
          {vocabularies.length > 0 ? (
            <FlatList
              removeClippedSubviews={true}
              initialNumToRender={5}
              maxToRenderPerBatch={5}
              refreshControl={
                <RefreshControl
                  refreshing={isFetching}
                  onRefresh={() => {
                    refetch();
                    refetchProgress();
                  }}
                  colors={[COLORS.highlight]}
                />
              }
              mt={5}
              ItemSeparatorComponent={renderSeparator}
              data={vocabularies}
              renderItem={({item, index}) => {
                return (
                  <>
                    <RecordItem
                      onDelete={() => {
                        setCurrentSelectedItemId(item);
                        openDelete();
                      }}
                      onSend={() => {
                        setCurrentSelectedItemId(item);
                        open();
                      }}
                      onPress={handlePressItem}
                      item={item}
                      isNew={completedIds.includes(item._id)}
                    />
                    {index === vocabularies.length - 1 && <View h={31} />}
                  </>
                );
              }}
              keyExtractor={item => item._id}
            />
          ) : (
            <>
              <EmptyData>Record your words to see them here</EmptyData>
              <View h={31} />
            </>
          )}
        </>
      )}
      <Modal isOpen={isShowingDelete} onClose={closeDelete}>
        <ModalCardDelete
          title="Delete?"
          description="Are you sure to delete this file? Recorded word and sentence (if have) will be deleted all!"
          onCancel={closeDelete}
          isLoading={isLoadingDelete}
          onDelete={() => {
            deleteRecord(currentSelectedItemId?._id!);
          }}
        />
      </Modal>
      <Modal onClose={close} isOpen={isShowing}>
        <ShareModal recordId={currentSelectedItemId?._id!} />
      </Modal>
    </VStack>
  );
};

export default MyRecordList;
