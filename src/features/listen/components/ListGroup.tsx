import {View} from 'native-base';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import GroupCard from '../../../components/group-card';
import {IGroup} from '../../../interfaces/api/Group';

const data = [
  {id: '1', text: 'Item 1'},
  {id: '2', text: 'Item 2'},
  {id: '3', text: 'Item 3'},
  {id: '4', text: 'Item 4'},
  {id: '5', text: 'Item 1'},
  {id: '6', text: 'Item 2'},
];

const ListGroup = ({groups}: {groups: IGroup[]}) => {
  return (
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
  );
};

export default ListGroup;
