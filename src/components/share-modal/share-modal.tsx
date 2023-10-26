import {useMutation, useQuery} from '@tanstack/react-query';
import {
  Button,
  FlatList,
  Pressable,
  Spinner,
  Text,
  VStack,
  View,
  useToast,
} from 'native-base';
import React from 'react';
import {RefreshControl, useWindowDimensions} from 'react-native';
import {groupService} from '../../services/group.service';
import {Input} from '../form';
import {GroupItem} from '../group-item';
import {COLORS} from '../../constants/design-system';
import {Send} from 'react-native-feather';
import {SendFilledIcon} from '../icons';
import {recordService} from '../../services/record.service';
import {Toast} from '../toast';

type Props = {
  recordId: string;
  isSendAll?: boolean;
  onDone?: () => void;
};

export const ShareModal = ({isSendAll = false, ...props}: Props) => {
  const [sendedGroupIds, setSendedGroupIds] = React.useState<string[]>([]);
  const [currentSendGroupId, setCurrentSendGroupId] =
    React.useState<string>('');
  const toast = useToast();
  const {mutate: send, isLoading} = useMutation({
    mutationFn: recordService.sendRecordToGroup,
    onSuccess: (data, variables) => {
      toast.show({
        render(props) {
          return (
            <Toast
              leftElementOnPress={() => {
                unsend({
                  groupId: variables.groupId,
                  recordId: variables.recordId,
                });
              }}
              leftElement={<>Undo</>}
              {...props}
              status="success">
              File has been sent!
            </Toast>
          );
        },
      });
      setSendedGroupIds(prev => [...prev, variables.groupId]);
    },
  });
  const {mutate: unsend} = useMutation({
    mutationFn: recordService.unsendRecordFromGroup,
    onSuccess: (data, variables) => {
      toast.show({
        render(props) {
          return (
            <Toast
              {...props}
              status="success"
              leftElement={<></>}
              leftElementOnPress={() => {}}
              autoHideDuration={1000}>
              File has been unsent!
            </Toast>
          );
        },
      });

      setSendedGroupIds(prev => prev.filter(id => id !== variables.groupId));
    },
  });

  const {mutate: sendAll, isLoading: isLoadingSendAll} = useMutation({
    mutationFn: recordService.sendAllRecordsToGroup,
    onSuccess: (data, variables) => {
      setSendedGroupIds(prev => [...prev, variables]);
      toast.show({
        render(props) {
          return (
            <Toast
              {...props}
              status="success"
              leftElement={<></>}
              leftElementOnPress={() => {}}
              autoHideDuration={1000}>
              File has been sent!
            </Toast>
          );
        },
      });
    },
  });

  const [query, setQuery] = React.useState('');
  const queryKey = ['groups', query];
  const {data, isFetching, refetch} = useQuery({
    queryKey: queryKey,
    queryFn: () =>
      groupService.searchMyGroups({
        page: 1,
        pageSize: 10,
        q: query,
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  const screenHeight = useWindowDimensions().height;
  const renderSeparator = () => <View h={5} />;
  return (
    <VStack maxHeight={(screenHeight * 2) / 3} space={5} p={5}>
      <Text>Send to...</Text>
      <Input
        value={query}
        onChangeText={text => setQuery(text)}
        typeInput="search"
        placeholder="Search"
      />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => {
              refetch();
            }}
            colors={[COLORS.highlight]}
          />
        }
        data={data?.items}
        ItemSeparatorComponent={renderSeparator}
        renderItem={({item}) => {
          return (
            <GroupItem
              group={item}
              rightElement={
                <Pressable
                  onPress={() => {
                    if (sendedGroupIds.includes(item._id)) {
                      return;
                    }
                    setCurrentSendGroupId(item._id);
                    if (isSendAll) {
                      sendAll(item._id);
                      return;
                    }
                    send({
                      recordId: props.recordId,
                      groupId: item._id,
                    });
                  }}
                  justifyContent="center"
                  alignItems="center"
                  px={3}>
                  {(isLoading || isLoadingSendAll) &&
                  currentSendGroupId === item._id ? (
                    <Spinner
                      color={COLORS.highlight}
                      accessibilityLabel="Sending..."
                    />
                  ) : (
                    <>
                      {sendedGroupIds.includes(item._id) ? (
                        <SendFilledIcon />
                      ) : (
                        <Send
                          opacity={0.6}
                          width={24}
                          height={24}
                          color={COLORS.text}
                        />
                      )}
                    </>
                  )}
                </Pressable>
              }
            />
          );
        }}
        keyExtractor={item => item._id}
      />
      <Button
        onPress={() => {
          props.onDone && props.onDone();
        }}>
        Done
      </Button>
    </VStack>
  );
};
