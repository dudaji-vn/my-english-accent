import {
  Avatar,
  Button,
  ChevronRightIcon,
  HStack,
  Modal,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base';

import {useMutation} from '@tanstack/react-query';
import React from 'react';
import {Dimensions, ImageSourcePropType} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';
import {COLORS, GRID} from '../../../constants/design-system';
import {SCREEN_NAMES} from '../../../constants/screen';
import {useRootSelector} from '../../../redux/reducers';
import {updateProfile} from '../../../redux/reducers/user.reducer';
import {userService} from '../../../services/user.service';
import {uploadImage} from '../../../utils/upload-image';
import {useLogout} from '../../auth/hooks/use-logout';
import {AppSetting} from '../components/app-setting';
import {DataAndStorage} from '../components/data-storage';
import {SettingButton} from '../components/setting-button';
import {PencilIcon} from '../../../components/icons';
import {ModalCard} from '../../../components/modal-card';
const fullWidth = Dimensions.get('window').width;

const SettingsScreen = ({navigation}: any) => {
  const user = useRootSelector(state => state.user.profile);
  const [isPressUpdateAvatar, setIsPressUpdateAvatar] = React.useState(false);
  const {logout} = useLogout(navigation);
  const dispatch = useDispatch();
  const avatar = user?.avatar;
  const {mutate} = useMutation({
    mutationFn: userService.updateUser,
    onSuccess: data => {
      dispatch(updateProfile(data));
    },
    onError: (error, variables) => {
      console.log('update user error', error, variables);
    },
  });

  const handleCropAvatar = React.useCallback(async () => {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    });
    if (!image) {
      return;
    }
    const url = await uploadImage({
      uri: image.path,
      name: image.filename || 'avatar',
      type: image.mime,
    });
    mutate({
      avatar: url as string,
    });
  }, [mutate]);

  const [showLogout, setShowLogout] = React.useState(false);
  const hideLogoutModal = () => setShowLogout(false);
  const showLogoutModal = () => setShowLogout(true);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const handleLogout = () => {
    hideLogoutModal();
    logout();
  };

  return (
    <ScrollView bgColor="white" height="full" px={4}>
      <VStack space={8}>
        <VStack space={4}>
          <HStack alignItems="center" space={4}>
            <Pressable
              onPressOut={() => {
                setIsPressUpdateAvatar(false);
              }}
              onPressIn={() => {
                setIsPressUpdateAvatar(true);
              }}
              onPress={handleCropAvatar}>
              <Avatar
                source={
                  {
                    uri: avatar as string | undefined,
                  } as ImageSourcePropType
                }
                bg={avatar ? 'transparent' : COLORS.stroke}
                w={15}
                h={15}
              />
              {isPressUpdateAvatar && (
                <View
                  rounded="full"
                  bg="transparent"
                  position="absolute"
                  justifyContent="center"
                  alignItems="center"
                  w="full"
                  h="full"
                  bottom={0}
                  right={0}>
                  <View
                    rounded="full"
                    bg="black"
                    opacity={0.5}
                    position="absolute"
                    justifyContent="center"
                    alignItems="center"
                    w="full"
                    h="full"
                    bottom={0}
                    right={0}>
                    <PencilIcon />
                  </View>
                  <PencilIcon />
                </View>
              )}
            </Pressable>
            <VStack>
              <Text fontSize="md" bold>
                {user?.fullName || 'No name'}
              </Text>
              <Text numberOfLines={1} fontSize="md">
                {user?.email || 'No email'}
              </Text>
            </VStack>
          </HStack>
          <SettingButton
            title="Edit Profile"
            onPress={() => {
              navigation.navigate(SCREEN_NAMES.settingsNavigator, {
                screen: SCREEN_NAMES.settingsProfile,
              });
            }}
            leftElement={<ChevronRightIcon />}
          />
        </VStack>
        <AppSetting />
        <DataAndStorage />
        <Button variant="outline" onPress={showLogoutModal}>
          Sign out
        </Button>
        <Modal
          isOpen={showLogout}
          onClose={hideLogoutModal}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}>
          <Modal.Content width={fullWidth - GRID.gap * 2}>
            <ModalCard
              title="Sign out?"
              cancelButton={
                <Button
                  onPress={hideLogoutModal}
                  ref={finalRef}
                  variant="outline">
                  Cancel
                </Button>
              }
              confirmButton={
                <Button onPress={handleLogout} ref={initialRef}>
                  Sign out
                </Button>
              }>
              <Text fontSize="md" color={COLORS.text}>
                Are you sure to sign out?
              </Text>
            </ModalCard>
          </Modal.Content>
        </Modal>
        <View width="full" bg="black" mb={24} />
      </VStack>
    </ScrollView>
  );
};

export default SettingsScreen;
