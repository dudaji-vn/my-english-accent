import {useNavigation} from '@react-navigation/native';
import {Avatar, FlatList, Pressable, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS} from '../../constants/design-system';
import {SCREEN_NAMES} from '../../constants/screen';
import {IGroupMember, IGroups} from '../../interfaces/api/Group';
import {IUser} from '../../interfaces/api/User';

const GroupCard = ({group}: {group: IGroups}) => {
  const navigation = useNavigation<any>();

  const [users, setUsers] = useState<IGroupMember[]>([]);
  useEffect(() => {
    if (!group) {
      return;
    }
    const numberUsers = group.members.length;
    const remainingCount = numberUsers > 4 ? numberUsers - 4 : 0;
    if (remainingCount > 0) {
      let newUsers = group.members.slice(0, 3);
      const remain: any = {
        _id: 'none',
        remainingCount: `+${remainingCount}`,
      };
      newUsers = [...newUsers, remain];
      setUsers(newUsers);
    } else {
      setUsers(group.members);
    }
  }, [group?.members.length]);
  const handleClick = () => {
    navigation.navigate(SCREEN_NAMES.listeningsNavigator, {
      screen: SCREEN_NAMES.listenDetailScreen,
      params: {typeScreen: 'group'},
    });
  };
  const renderMember = ({item, index}: {item: IGroupMember; index: number}) => {
    return (
      <View style={styles.avatar}>
        <Avatar
          backgroundColor={item?.remainingCount && COLORS.highlight}
          size={'sm'}
          source={{
            uri: item.avatar,
          }}>
          <Text style={{fontSize: 14, color: '#fff'}}>
            {item.displayName ? item.displayName : item?.remainingCount}
          </Text>
        </Avatar>
      </View>
    );
  };
  return (
    <Pressable onPress={handleClick} style={styles.container}>
      <FlatList
        initialNumToRender={2}
        data={users}
        keyExtractor={(item, index) => item._id.toString()}
        numColumns={2}
        renderItem={renderMember}
      />

      <Text style={styles.textName}>{group?.name}</Text>
      <Text style={styles.textRole}>{group?.members.length} members</Text>
      <Text style={styles.textSentences}>0 sentences</Text>
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
