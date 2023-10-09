import {Button, ChevronRightIcon, HStack, Text, VStack} from 'native-base';
import {COLORS} from '../../../constants/design-system';

import React from 'react';
import {Headphones, HelpCircle, Image, Mic} from 'react-native-feather';
import {Switch} from 'react-native-switch';
import {IconWrapper} from '../../../components/icon-wrapper';
import {Modal} from '../../../components/modal';
import {ModalCard} from '../../../components/modal-card';
import {useModal} from '../../../hooks/use-modal';
import {SettingButton} from './setting-button';
import {SettingSection} from './setting-section';
import {PERMISSIONS, Permission, check} from 'react-native-permissions';
import {useMutation} from '@tanstack/react-query';
import {userService} from '../../../services/user.service';
import {useDispatch} from 'react-redux';
import {updateProfile} from '../../../redux/reducers/user.reducer';
import {useRootSelector} from '../../../redux/reducers';

export const AppSetting = () => {
  const {close, open, isShowing} = useModal();
  const autoDownload = useRootSelector(
    state => state.user.profile.autoDownload,
  ) as boolean;
  const [isEnabled, setIsEnabled] = React.useState(autoDownload);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const dispatch = useDispatch();
  const [isShowQuestion, setIsShowQuestion] = React.useState(false);
  const showQuestion = () => setIsShowQuestion(true);
  const hideQuestion = () => setIsShowQuestion(false);
  const {mutate} = useMutation({
    mutationFn: userService.updateUser,
    onSuccess: data => {
      dispatch(updateProfile(data));
    },
    onError: (error, variables) => {
      console.log('update user error', error, variables);
    },
  });

  const toggleAutoDownload = () => {
    toggleSwitch();
    mutate({
      autoDownload: !isEnabled,
    });
  };

  return (
    <SettingSection title="App's Setting">
      <VStack space={1}>
        <SettingButton
          onPress={open}
          leftElement={<ChevronRightIcon />}
          title="App's permission"
        />
        <SettingButton
          leftElement={
            <Switch
              value={isEnabled}
              onValueChange={toggleAutoDownload}
              circleSize={20}
              barHeight={24}
              circleBorderWidth={0}
              backgroundActive={COLORS.highlight}
              backgroundInactive={COLORS.stroke}
              circleActiveColor="white"
              circleInActiveColor="white"
              changeValueImmediately={true}
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={2}
              switchRightPx={2}
              switchWidthMultiplier={2.2}
            />
          }>
          <HStack alignItems="center" space={4}>
            <Text fontSize="md" color={COLORS.text}>
              Auto download
            </Text>

            <IconWrapper onPress={showQuestion} colorOnPress={COLORS.highlight}>
              <HelpCircle color={COLORS.text} width={20} height={20} />
            </IconWrapper>
            <Modal isOpen={isShowQuestion} onClose={hideQuestion}>
              <ModalCard
                title="Auto download"
                confirmButton={
                  <Button w="full" onPress={hideQuestion} variant="outline">
                    I got it
                  </Button>
                }>
                <Text textAlign="center">
                  When you enable “
                  <Text fontWeight="semibold">Auto download</Text>”, we will
                  automatically download every listen files you have clicked
                  play
                </Text>
              </ModalCard>
            </Modal>
          </HStack>
        </SettingButton>
      </VStack>
      <Modal isOpen={isShowing} onClose={close}>
        <ModalCard
          title="App’s permissions"
          description="Please kindly accept these permissions to allow the app runs smoothly!"
          cancelButton={
            <Button flex={1} onPress={close}>
              Go to setting
            </Button>
          }>
          <VStack space={5}>
            <PermissionItem
              title="Micro permission"
              icon={<Mic />}
              permission={PERMISSIONS.ANDROID.RECORD_AUDIO}
            />
            <PermissionItem
              title="Audio permission"
              icon={<Headphones />}
              permission={PERMISSIONS.ANDROID.READ_MEDIA_AUDIO}
            />
            <PermissionItem
              title="Image permission"
              icon={<Image />}
              permission={PERMISSIONS.ANDROID.READ_MEDIA_IMAGES}
            />
          </VStack>
        </ModalCard>
      </Modal>
    </SettingSection>
  );
};

const PermissionItem = ({
  title,
  icon,
  permission,
}: {
  icon: React.ReactNode;
  title: string;
  permission: Permission;
}) => {
  const [status, setStatus] = React.useState('');
  React.useEffect(() => {
    check(permission).then(result => {
      setStatus(result);
    });
  }, [permission]);
  const color = React.useMemo(() => {
    switch (status) {
      case 'granted':
        return COLORS.highlight;
      case 'denied':
        return COLORS.error;
      default:
        return COLORS.text;
    }
  }, [status]);
  return (
    <HStack justifyContent="space-between">
      <HStack space={2} alignItems="center">
        <IconWrapper>{icon}</IconWrapper>
        <Text fontSize="md" color={COLORS.text}>
          {title}
        </Text>
      </HStack>
      <Text textTransform="capitalize" fontSize="md" color={color}>
        {status}
      </Text>
    </HStack>
  );
};
