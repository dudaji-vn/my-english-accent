import {ScrollView, View} from 'native-base';
import React from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';
import UserCard from '../../../components/user-card';

const data = [
  {id: '1', text: 'Item 1'},
  {id: '2', text: 'Item 2'},
  {id: '3', text: 'Item 3'},
  {id: '4', text: 'Item 4'},
  {id: '5', text: 'Item 1'},
  {id: '6', text: 'Item 2'},

  // Add more items as needed
];

const ListUser = () => {
  return (
    <View style={{marginHorizontal: -10}}>
      <FlatList
        horizontal={false}
        data={data}
        numColumns={2}
        renderItem={({item}) => <UserCard />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
  },
});

export default ListUser;
