import {View} from 'native-base';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import GroupCard from '../../../components/group-card';
import {IGroups} from '../../../interfaces/api/Group';

const data = [
  {id: '1', text: 'Item 1'},
  {id: '2', text: 'Item 2'},
  {id: '3', text: 'Item 3'},
  {id: '4', text: 'Item 4'},
  {id: '5', text: 'Item 1'},
  {id: '6', text: 'Item 2'},
];

const ListGroup = ({groups}: {groups: IGroups[]}) => {
  return (
    <View style={{marginHorizontal: -10, maxHeight: 900}}>
      <FlatList
        horizontal={false}
        data={groups}
        numColumns={2}
        renderItem={({item}) => <GroupCard group={item} />}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default ListGroup;
