import {useNavigation} from '@react-navigation/native';
import {Avatar, FlatList, Pressable, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS} from '../../constants/design-system';
import {SCREEN_NAMES} from '../../constants/screen';

const GroupCard = () => {
  const navigation = useNavigation<any>();
  const handleClick = () => {
    navigation.navigate(SCREEN_NAMES.listeningsNavigator, {
      screen: SCREEN_NAMES.listenDetailScreen,
      params: {typeScreen: 'group'},
    });
  };
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
    }
  }, [users.length]);

  const renderMember = ({item, index}: {item: any; index: number}) => {
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
  };
  return (
    <Pressable onPress={handleClick} style={styles.container}>
      <FlatList
        initialNumToRender={4}
        data={users}
        keyExtractor={(item, index) => item._id.toString()}
        numColumns={2}
        renderItem={renderMember}
      />

      <Text style={styles.textName}>Group name</Text>
      <Text style={styles.textRole}>5 members</Text>
      <Text style={styles.textSentences}>12 sentences</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lighterBackground,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#161616',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  avatar: {
    position: 'relative',
    margin: 2,
  },
  avatarImage: {},
  flag: {
    position: 'absolute',
    bottom: 0,
    right: 0,
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
export default GroupCard;
