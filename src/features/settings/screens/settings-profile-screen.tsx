import {
  Button,
  FormControl,
  HStack,
  Modal,
  ScrollView,
  Text,
  VStack,
  View,
  useToast,
} from 'native-base';
import {Controller, useForm} from 'react-hook-form';
import {nationals, positions} from '../configs';

import {COLORS, GRID} from '../../../constants/design-system';
import {Input} from '../../../components/form';
import {NavigationProp} from '@react-navigation/native';
import {RadioCard} from '../components/radio-card';
import React from 'react';
import {useRootSelector} from '../../../redux/reducers';
import {useMutation} from '@tanstack/react-query';
import {userService} from '../../../services/user.service';
import {updateProfile} from '../../../redux/reducers/user.reducer';
import {useDispatch} from 'react-redux';
import Toast from '../../../components/toast/toast';
import {useModal} from '../../../hooks/use-modal';
import {ModalCard} from '../../../components/modal-card';
import {Alert, Dimensions} from 'react-native';

const FULL_NAME_MAX_LENGTH = 60;
const DISPLAY_NAME_MAX_LENGTH = 16;
const fullWidth = Dimensions.get('window').width;

type Props = {
  navigation: NavigationProp<any>;
};

const SettingsProfileScreen = ({navigation}: Props) => {
  const user = useRootSelector(state => state.user.profile)!;
  const {close, finalRef, initialRef, isShowing} = useModal();
  const toast = useToast();
  const dispatch = useDispatch();
  const {mutate, isLoading} = useMutation({
    mutationFn: userService.updateUser,
    onSuccess: data => {
      dispatch(updateProfile(data));
      toast.show({
        render(props) {
          return (
            <Toast {...props} status="success">
              Your changes have been saved!
            </Toast>
          );
        },
        placement: 'bottom',
      });
    },
    onError: (error, variables) => {
      console.log('update user error', error, variables);
    },
  });
  const {
    control,
    handleSubmit,
    formState: {errors, isDirty},
  } = useForm({
    defaultValues: {
      fullName: user.fullName,
      displayName: user.displayName,
      nativeLanguage: user.nativeLanguage,
      role: user.role,
    },
    mode: 'onChange',
  });
  const onSubmit = (data: any) => {
    mutate(data);
  };

  const isValid = isDirty && Object.keys(errors).length === 0;
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (!isDirty) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            {text: "Don't leave", style: 'cancel', onPress: () => {}},
            {
              text: 'Discard',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ],
        );
      }),
    [navigation, isDirty],
  );

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'} bg="white" px={5}>
      <FormControl>
        <VStack space={10}>
          <Section title="Name">
            <Controller
              shouldUnregister
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'This field is required',
                },

                maxLength: {
                  value: FULL_NAME_MAX_LENGTH,
                  message: `This field must be less than ${FULL_NAME_MAX_LENGTH} characters`,
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  label="Your full name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your full name"
                  error={errors.fullName?.message || ''}
                />
              )}
              name="fullName"
            />
            <Controller
              shouldUnregister
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'This field is required',
                },

                maxLength: {
                  value: DISPLAY_NAME_MAX_LENGTH,
                  message: `This field must be less than ${DISPLAY_NAME_MAX_LENGTH} characters`,
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  label="Your display name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your display name"
                  error={errors.displayName?.message}
                  maxLength={DISPLAY_NAME_MAX_LENGTH + 1}
                />
              )}
              name="displayName"
            />
          </Section>
          <Section title="Nationality">
            <Controller
              control={control}
              render={({field: {onChange, value: _value}}) => (
                <HStack space={5}>
                  {nationals.map(({content, value}) => (
                    <RadioCard
                      key={value}
                      isActive={_value === value}
                      content={content}
                      onPress={() => onChange(value)}
                    />
                  ))}
                </HStack>
              )}
              name="nativeLanguage"
            />
          </Section>
          <Section title="Position">
            <Controller
              control={control}
              render={({field: {onChange, value: _value}}) => (
                <HStack space={5}>
                  {positions.map(({content, value}) => (
                    <RadioCard
                      key={value}
                      isActive={_value === value}
                      content={content}
                      onPress={() => onChange(value)}
                    />
                  ))}
                </HStack>
              )}
              name="role"
            />
          </Section>
          <Button
            isLoading={isLoading}
            opacity={isValid ? 1 : 0.3}
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}
            h={14.5}
            bg={COLORS.highlight}
            rounded="lg">
            <Text color="white">Save your changes</Text>
          </Button>

          <View />
        </VStack>
      </FormControl>
      <Modal
        isOpen={isShowing}
        onClose={close}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}>
        <Modal.Content width={fullWidth - GRID.gap * 2}>
          <ModalCard
            title="Go back?"
            cancelButton={
              <Button onPress={close} ref={finalRef} variant="outline">
                Cancel
              </Button>
            }
            confirmButton={
              <Button onPress={navigation.goBack} ref={initialRef}>
                Go back
              </Button>
            }>
            <Text fontSize="md" color={COLORS.text}>
              Are you sure to go back? Your changes won’t be saved.
            </Text>
          </ModalCard>
        </Modal.Content>
      </Modal>
    </ScrollView>
  );
};

export default SettingsProfileScreen;

const Section = ({
  children,
  title,
}: {
  title?: string;
  children?: React.ReactNode;
}) => {
  return (
    <VStack space={5}>
      <Text fontWeight="semibold" fontSize="xl" color={COLORS.text}>
        {title}
      </Text>
      {children}
    </VStack>
  );
};
