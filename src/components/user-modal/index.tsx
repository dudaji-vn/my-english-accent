import {Button, HStack, Image, Text, VStack, View} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {COLORS, OPACITY} from '../../constants/design-system';
import {useModal} from '../../hooks/use-modal';
import {useUser} from '../../hooks/useUser';
import {IUserProgress} from '../../interfaces/api/User';
import {useRootSelector} from '../../redux/reducers';
import {updateProfile} from '../../redux/reducers/user.reducer';
import {capitalizeFirstLetter} from '../../utils/string';
import HeartIcon from '../icons/heart-icon';
import {Modal} from '../modal';
import {ModalCardDelete} from '../modal-card';
import UserAvatar from '../user-avatar';
interface IUserModal {
  user: IUserProgress;
}
const UserModal = (props: IUserModal) => {
  const [type, setType] = useState<string>('add');
  const userProfile = useRootSelector(item => item.user.profile);

  const user = useMemo(() => {
    if (props.user) {
      return props.user;
    }
  }, [props.user]);
  useEffect(() => {
    if (userProfile?.favoriteUsers.includes(props.user._id)) {
      setType('remove');
    } else {
      setType('add');
    }
    console.log(userProfile);
  }, [userProfile, props.user]);
  const {addOrRemoveFavoriteUser} = useUser();

  const myBadges = [
    {
      name: 'Bee',
      icon: require('../../assets/images/bee.png'),
    },
    {
      name: 'Game',
      icon: require('../../assets/images/badge-game.png'),
    },
    {
      name: 'Listener',
      icon: require('../../assets/images/badge-listener.png'),
    },
    {
      name: 'Recorder',
      icon: require('../../assets/images/badge-record.png'),
    },
  ];
  const {
    open: openDelete,
    close: closeDelete,
    isShowing: isShowingDelete,
  } = useModal();
  const dispatch = useDispatch();
  return (
    <VStack p={5}>
      <VStack alignItems={'center'} mb={8}>
        <HStack justifyContent={'center'}>
          <UserAvatar
            nativeLanguage={user?.nativeLanguage}
            imageUrl={user?.avatar}
            flagWidth={8}
            width={24}
            height={24}
          />
        </HStack>
        <Text>{user?.displayName}</Text>
      </VStack>
      <View>
        <Text mb={2} textAlign={'left'}>
          Badges
        </Text>
        <HStack justifyContent={'space-between'} mb={8}>
          {myBadges.map(item => {
            return (
              <VStack flex={1} alignItems={'center'}>
                <Image mb={2} h={84} width={76} source={item.icon} />
                <Text>{item.name}</Text>
              </VStack>
            );
          })}
        </HStack>
      </View>
      <HStack space={4} bg={COLORS.background} px={3} py={4}>
        <Text fontWeight={300} opacity={OPACITY.normal} textAlign={'left'}>
          Full name
        </Text>
        <Text textAlign={'left'}>{user?.fullName}</Text>
      </HStack>
      <HStack space={4} bg={COLORS.background} px={3} py={4} mb={4}>
        <Text fontWeight={300} opacity={OPACITY.normal} textAlign={'left'}>
          Role
        </Text>
        {user?.role && (
          <Text textAlign={'left'}>{capitalizeFirstLetter(user.role)}</Text>
        )}
      </HStack>
      <Button
        onPress={() => {
          if (user?._id && userProfile?.favoriteUsers) {
            addOrRemoveFavoriteUser({
              type: type,
              userId: user?._id,
            });
            if (type === 'add') {
              dispatch(
                updateProfile({
                  favoriteUsers: [...userProfile.favoriteUsers, user?._id],
                }),
              );
            } else {
              openDelete();
            }
          }
        }}>
        <HStack space={2}>
          <HeartIcon />
          <Text color="white">
            {type === 'add'
              ? 'Add your favorite list'
              : 'In your favorite list'}
          </Text>
        </HStack>
      </Button>
      <Modal isOpen={isShowingDelete} onClose={closeDelete}>
        <ModalCardDelete
          deleteText="Unfavorite"
          title="Unfavorite?"
          description="Do you want to move this user out of your Favorite list?"
          onCancel={closeDelete}
          onDelete={() => {
            closeDelete();
            if (userProfile?.favoriteUsers) {
              dispatch(
                updateProfile({
                  favoriteUsers: [
                    ...userProfile.favoriteUsers.filter(
                      item => item !== user?._id,
                    ),
                  ],
                }),
              );
            }
          }}
        />
      </Modal>
    </VStack>
  );
};

export default UserModal;
