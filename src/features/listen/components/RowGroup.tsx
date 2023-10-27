import {useNavigation} from '@react-navigation/native';
import {Avatar, HStack, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS} from '../../../constants/design-system';
import {IGroup, IGroupMember} from '../../../interfaces/api/Group';

interface IRowGroupProps {
  group: IGroup | any;
  isShowingName?: boolean;
  isLarge?: boolean;
}
const RowGroup = (props: IRowGroupProps) => {
  const {group, isShowingName, isLarge} = props;
  const navigation = useNavigation<any>();
  const handleClick = () => {};

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const numberUsers = group.members.length;
    const remainingCount = numberUsers > 4 ? numberUsers - 4 : 0;
    if (remainingCount > 0) {
      let newUsers = group.members.slice(0, 3);
      newUsers = [
        ...newUsers,
        {_id: 'none', remainingCount: `+${remainingCount}`},
      ];
      setUsers(newUsers);
    } else {
      setUsers(group.members);
    }
  }, [group]);

  return (
    <HStack alignItems={'center'}>
      <View style={[styles.container, isLarge && {width: 100}]}>
        {users.map((item: any, index) => {
          return (
            <View key={item?._id} style={styles.avatar}>
              <Avatar
                backgroundColor={item?.remainingCount && COLORS.highlight}
                size={isLarge ? 12 : 'sm'}
                source={{
                  uri: item.avatar,
                }}>
                <Text style={{fontSize: 14, color: '#fff'}}>
                  {item.name ? item.name : item?.remainingCount}
                </Text>
              </Avatar>
            </View>
          );
        })}
      </View>
      {isShowingName && (
        <View>
          <Text style={styles.textName}>{group.name}</Text>
          {/* <Text style={styles.textSentences}>11 sentences</Text> */}
        </View>
      )}
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
