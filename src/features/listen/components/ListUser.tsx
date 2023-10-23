import {View} from 'native-base';
import React from 'react';
import {FlatList} from 'react-native';
import UserCard from '../../../components/user-card';
import {IUserProgress} from '../../../interfaces/api/User';

interface IListUser {
  users: IUserProgress[];
}
const ListUser = (props: IListUser) => {
  const {users} = props;
  return (
    <View style={{marginHorizontal: -10}}>
      <FlatList
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        horizontal={false}
        data={users}
        numColumns={2}
        renderItem={({item}) => <UserCard userProgress={item} />}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default ListUser;
