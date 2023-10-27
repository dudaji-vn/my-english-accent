import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {Button, HStack, Text, VStack, View} from 'native-base';
import {memo} from 'react';
import {Dimensions} from 'react-native';
import AddIcon from '../../../../components/icons/add-icon';
import {LoadingScreen} from '../../../../components/screens/loading-screen';
import {COLORS} from '../../../../constants/design-system';
import {SCREEN_NAMES} from '../../../../constants/screen';
import {groupService} from '../../../../services/group.service';
import ListGroup from '../../components/ListGroup';
import GroupNotFound from './group-notfound';

const fullWidth = Dimensions.get('window').width;
const MainGroupScreen = () => {
  const navigation = useNavigation<any>();
  const {data: myGroups, isFetching} = useQuery({
    queryKey: ['myGroups'],
    queryFn: groupService.getMyGroup,
  });
  const handleClick = () => {
    navigation.navigate(SCREEN_NAMES.listeningsNavigator, {
      screen: SCREEN_NAMES.createGroup,
    });
  };

  if (isFetching || !myGroups) {
    return <LoadingScreen />;
  }

  return myGroups?.length === 0 ? (
    <GroupNotFound />
  ) : (
    <View flex={1} marginX={5} marginTop={5}>
      <Button
        onPress={handleClick}
        marginBottom={5}
        borderWidth={1}
        borderColor={COLORS.highlight}
        width={fullWidth - 40}
        height={14}
        _pressed={{bg: '#E6E6E6'}}
        bg={COLORS.background}>
        <HStack space={2}>
          <AddIcon />
          <Text color={COLORS.highlight}>Create new group</Text>
        </HStack>
      </Button>
      <VStack marginX={-2} flex={1} mb={24}>
        <ListGroup groups={myGroups} />
      </VStack>
    </View>
  );
};

export default memo(MainGroupScreen);
