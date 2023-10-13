import {View, Button, HStack, Text} from 'native-base';
import ListGroup from '../../components/ListGroup';
import {Dimensions} from 'react-native';
import {COLORS} from '../../../../constants/design-system';
import AddIcon from '../../../../components/icons/add-icon';
import {SCREEN_NAMES} from '../../../../constants/screen';
import {useNavigation} from '@react-navigation/native';
import GroupNotFound from './group-notfound';

const fullWidth = Dimensions.get('window').width;
const MainGroupScreen = () => {
  const navigation = useNavigation<any>();
  const handleClick = () => {
    navigation.navigate(SCREEN_NAMES.listeningsNavigator, {
      screen: SCREEN_NAMES.createGroup,
    });
  };

  return true ? (
    <GroupNotFound />
  ) : (
    <View marginX={5} marginTop={5}>
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
      <View>
        <ListGroup />
      </View>
    </View>
  );
};

export default MainGroupScreen;
