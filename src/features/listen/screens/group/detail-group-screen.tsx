import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import moment from 'moment';
import {Button, HStack, Pressable, Text, VStack} from 'native-base';
import {Dimensions, FlatList} from 'react-native';
import AddMemberIcon from '../../../../components/icons/add-member-icon';
import CloseIcon from '../../../../components/icons/close-icon';
import HostIcon from '../../../../components/icons/host-icon';
import ScreenWrapper from '../../../../components/layout/screen-wrapper';
import {COLORS} from '../../../../constants/design-system';
import RowGroup from '../../components/RowGroup';
import RowUserAvatar from '../../components/RowUserAvatar';
const fullHeight = Dimensions.get('window').height;
type Props = {
  route: RouteProp<any>;
  navigation: NavigationProp<any>;
};

const DetailGroupScreen = (props: Props) => {
  const navigation = useNavigation();

  const {route} = props;
  const {group} = route.params!;

  const formatDate = (date: string) => {
    return moment(date).format('DD/MM/YYYY');
  };

  return (
    <ScreenWrapper>
      <HStack justifyContent={'space-between'} mb={6}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <CloseIcon />
        </Pressable>

        <Pressable p={4}>
          <AddMemberIcon />
        </Pressable>
      </HStack>
      <VStack alignItems={'center'} justifyContent={'center'}>
        <RowGroup group={group} isLarge />
        <Text color={COLORS.darkColor} fontWeight={600} mt={4}>
          {group.name}
        </Text>
      </VStack>
      <HStack px={3} py={4} justifyContent={'space-between'}>
        <Text>Create by </Text>
        <Text>{group?.creator?.displayName}</Text>
      </HStack>
      <HStack
        px={3}
        py={4}
        backgroundColor={COLORS.background}
        justifyContent={'space-between'}>
        <Text>Create on </Text>
        <Text>{group?.createdAt && formatDate(group.createdAt)}</Text>
      </HStack>
      {group.members && (
        <VStack maxHeight={'40%'} my={8}>
          <Text mb={5}>Members ({group.members.length})</Text>
          <FlatList
            renderItem={({item}) => {
              return (
                <HStack
                  marginBottom={5}
                  alignItems={'center'}
                  justifyContent={'space-between'}>
                  <RowUserAvatar isHighLightName={item.isInvite} user={item} />
                  {group?.creator?._id === item._id && <HostIcon />}
                  {/* <Pressable paddingLeft={4}>
                  {!item.isInvite ? <AddMemberIcon /> : <RemoveMemberIcon />}
                </Pressable> */}
                </HStack>
              );
            }}
            data={group.members}
          />
        </VStack>
      )}

      {/* <Button
        _pressed={{
          bg: COLORS.errorClick,
        }}
        bg={COLORS.white}
        borderWidth={1}
        _text={{color: COLORS.error}}
        borderColor={COLORS.error}>
        Leave Group
      </Button> */}
    </ScreenWrapper>
  );
};

export default DetailGroupScreen;
