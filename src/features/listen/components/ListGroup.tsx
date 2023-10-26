import {Text, View} from 'native-base';
import React from 'react';
import {FlatList} from 'react-native';
import GroupCard from '../../../components/group-card';
import {IGroup} from '../../../interfaces/api/Group';
import SearchNotFound from '../../../components/search-notfound';

const ListGroup = ({
  groups,
  emptyText,
}: {
  groups: IGroup[];
  emptyText?: string;
}) => {
  return (
    <>
      {groups?.length === 0 && (
        <>
          {emptyText ? (
            <Text pl={3} fontSize="xl">
              {emptyText}
            </Text>
          ) : (
            <SearchNotFound />
          )}
        </>
      )}
      <FlatList
        initialNumToRender={3}
        maxToRenderPerBatch={2}
        horizontal={false}
        data={groups}
        numColumns={2}
        renderItem={({item}) => (
          <View width={'50%'}>{item && <GroupCard group={item} />}</View>
        )}
        keyExtractor={item => item._id}
      />
    </>
  );
};

export default ListGroup;
