import {useNavigation} from '@react-navigation/native';
import {Avatar, FlatList, HStack, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS} from '../../../constants/design-system';

const RowGroup = () => {
  const navigation = useNavigation<any>();
  const handleClick = () => {};
  const listUsers: any = [
    {
      _id: '111',
      name: 'Linh',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      nativeLanguage: 'ko',
    },
    {
      _id: '222',
      name: 'Linh',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      nativeLanguage: 'ko',
    },
    {
      _id: '333',
      name: 'Linh',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      nativeLanguage: 'ko',
    },
    {
      _id: '444',
      name: 'Linh',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      nativeLanguage: 'ko',
    },
    {
      _id: '555',
      name: 'Linh',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      nativeLanguage: 'ko',
    },
  ];
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const numberUsers = listUsers.length;
    const remainingCount = numberUsers > 4 ? numberUsers - 4 : 0;
    if (remainingCount > 0) {
      let newUsers = listUsers.slice(0, 3);
      newUsers = [
        ...newUsers,
        {_id: 'none', remainingCount: `+${remainingCount}`},
      ];
      setUsers(newUsers);
    } else {
      setUsers(listUsers);
    }
  }, [users.length]);

  return (
    <HStack alignItems={'center'}>
      <View style={styles.container}>
        {users.map((item: any, index) => {
          return (
            <View style={styles.avatar}>
              <Avatar
                backgroundColor={item?.remainingCount && COLORS.highlight}
                size={'sm'}
                source={{
                  uri:
                    item.name &&
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                }}>
                <Text style={{fontSize: 14, color: '#fff'}}>
                  {item.name ? item.name : item?.remainingCount}
                </Text>
              </Avatar>
            </View>
          );
        })}
      </View>
      <View>
        <Text style={styles.textName}>Group name</Text>
        <Text style={styles.textSentences}>11 sentences</Text>
      </View>
    </HStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 80,
    gap: 4,
  },
  avatar: {
    position: 'relative',
  },

  textName: {
    color: COLORS.darkColor,
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 8,
  },
  textRole: {
    color: COLORS.darkColor,
    fontWeight: '300',
    fontSize: 16,
    marginBottom: 20,
  },
  textSentences: {
    color: COLORS.text,
    fontWeight: '400',
    fontSize: 16,
  },
});
export default RowGroup;
