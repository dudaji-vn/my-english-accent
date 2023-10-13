import {HStack, Text, View} from 'native-base';
import ScreenWrapper from '../../../../components/layout/screen-wrapper';
import {Swiper} from '../../../../components/swiper';
import CustomSwiper from '../../components/CustomSwiper';
import AudioItem from '../../components/AudioItem';
import {Dimensions} from 'react-native';
import {Filter} from '../../../../components/filter';
import PlayAllIcon from '../../../../components/icons/play-all-icon';
import CloseIcon from '../../../../components/icons/close-icon';
import {RouteProp, NavigationProp} from '@react-navigation/native';
import UserAvatar from '../../../../components/user-avatar';
import ArrowDownIcon from '../../../../components/icons/arrow-down-icon';
const fullHeight = Dimensions.get('window').height;
type Props = {
  route: RouteProp<any>;
  navigation: NavigationProp<any>;
};
const ListAudioListenScreen = (props: Props) => {
  const filterItems = [
    {
      label: 'Test',
      value: 'test',
      icon: <UserAvatar w={6} h={6} flagWidth={2} nation={'ko'} />,
    },
    {
      label: 'Test1',
      value: 'test1',
      icon: <UserAvatar w={6} h={6} flagWidth={2} nation={'ko'} />,
    },
    {
      label: 'Test2',
      value: 'test2',
      icon: <UserAvatar w={6} h={6} flagWidth={2} nation={'ko'} />,
    },
    {
      label: 'Test3',
      value: 'test3',
      icon: <UserAvatar w={6} h={6} flagWidth={2} nation={'ko'} />,
    },
    {
      label: 'Test4',
      value: 'test4',
      icon: <UserAvatar w={6} h={6} flagWidth={2} nation={'ko'} />,
    },
  ];
  const {route} = props;
  const typeScreen = route.params?.typeScreen;
  return (
    <ScreenWrapper>
      <HStack justifyContent={'space-between'} mb={6}>
        <CloseIcon />
        {true && (
          <Filter
            maxHeight={220}
            marginTop={2}
            marginLeft={-2}
            placement="bottom"
            icon={
              <HStack space={2} alignItems={'center'}>
                <UserAvatar nation={'ko'} />
                <ArrowDownIcon />
              </HStack>
            }
            onSelected={value => {
              console.log(value);
            }}
            filterItems={filterItems}
          />
        )}
        <PlayAllIcon />
      </HStack>

      <View h={700}>
        <CustomSwiper>
          <AudioItem />
          <AudioItem />
          <AudioItem />
          <AudioItem />
          <AudioItem />
          <AudioItem />
          <AudioItem />
          <AudioItem />
          <AudioItem />
          <AudioItem />
        </CustomSwiper>
      </View>
    </ScreenWrapper>
  );
};

export default ListAudioListenScreen;
