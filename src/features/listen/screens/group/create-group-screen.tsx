import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  Avatar,
  Button,
  HStack,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import BreadCrumb from '../../../../components/bread-crumb/bread-crumb';
import {Input} from '../../../../components/form';
import AddMemberIcon from '../../../../components/icons/add-member-icon';
import AvatarIcon from '../../../../components/icons/avatar';
import RemoveMemberIcon from '../../../../components/icons/remove-member-icon';
import ScrollViewLayout from '../../../../components/layout/scroll-view-layout';
import {Modal} from '../../../../components/modal';
import {ModalCard} from '../../../../components/modal-card';
import {COLORS} from '../../../../constants/design-system';
import {useModal} from '../../../../hooks/use-modal';
import {IFormAddGroup, IUserInvite} from '../../../../interfaces/api/Group';
import {groupService} from '../../../../services/group.service';
import {listenService} from '../../../../services/listen.service';
import {uploadImage} from '../../../../utils/upload-image';
import RowUserAvatar from '../../components/RowUserAvatar';

const CreateGroupScreen = () => {
  const {close, isShowing, open} = useModal();
  const queryClient = useQueryClient();
  const [allowGoBack, setAllowGoBack] = useState(false);
  const {data: users} = useQuery({
    queryKey: ['listen-user-progress'],
    queryFn: listenService.getUserProgress,
  });
  const {mutate} = useMutation({
    mutationFn: groupService.createGroup,
    onSuccess: data => {
      setAllowGoBack(true);
      setTimeout(() => {
        navigation.goBack();
      }, 100);
    },
    onSettled: () => {
      // Invalidate the query to refetch the data
      queryClient.invalidateQueries({queryKey: ['myGroups']});
    },
    onError: (error, variables) => {
      console.log('create group error', error, variables);
    },
  });
  const navigation = useNavigation<any>();
  const [isFocus, setIsFocus] = useState(false);
  const [usersInvite, setUsersInvite] = useState<IUserInvite[]>([]);
  const [formGroup, setFormGroup] = useState<IFormAddGroup>({
    avatar: '',
    name: '',
    members: [],
  });

  useEffect(() => {
    if (!users) {
      return;
    }
    const userInvites: IUserInvite[] = users.map(user => {
      return {
        _id: user._id,
        avatar: user.avatar,
        displayName: user.displayName,
        nativeLanguage: user.nativeLanguage,
        role: user.role,
        isInvite: false,
      };
    });
    setUsersInvite(userInvites);
  }, [users]);
  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (allowGoBack) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        open();
      }),

    [navigation, allowGoBack],
  );
  const handleCropAvatar = async () => {
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

    setFormGroup((prev: any) => {
      return {
        ...prev,
        avatar: url,
      };
    });
  };

  const handleChangeInput = (name: string) => {
    setIsFocus(true);
    setFormGroup((prev: any) => {
      return {
        ...prev,
        name: name,
      };
    });
  };

  const handleToggleInviteUser = (index: number) => {
    const newUserInvites = [...usersInvite];
    newUserInvites[index].isInvite = !newUserInvites[index].isInvite;
    setUsersInvite(newUserInvites);
  };

  useEffect(() => {
    const members = usersInvite
      .filter(item => item.isInvite)
      .map(item => item._id);
    setFormGroup(prev => {
      return {
        ...prev,
        members: members,
      };
    });
  }, [usersInvite]);

  const handleSubmit = () => {
    mutate(formGroup);
  };
  return (
    <ScrollViewLayout>
      <BreadCrumb parentTitle="Listen" mainTitle="Create new group" />
      <View style={styles.groupContainer} bg={COLORS.white}>
        <Pressable onPress={handleCropAvatar} mb={8} alignItems={'center'}>
          {formGroup.avatar ? (
            <Avatar width={100} height={100} source={{uri: formGroup.avatar}} />
          ) : (
            <AvatarIcon />
          )}
        </Pressable>
        <Text mb={2}>What's your group name?</Text>
        <Input
          value={formGroup.name}
          onChangeText={handleChangeInput}
          error={isFocus && !formGroup.name && 'This field is required'}
          placeholder="Enter group name"
        />
      </View>
      <View style={styles.memberContainer} bg={COLORS.white}>
        <HStack mb={2} justifyContent={'space-between'}>
          <Text>Add member</Text>
          <Text>({formGroup.members.length})</Text>
        </HStack>
        <View mb={5}>
          <Input typeInput="search" placeholder="Search" />
        </View>

        <ScrollView nestedScrollEnabled style={{maxHeight: 330}}>
          {usersInvite &&
            usersInvite.map((item, index) => {
              return (
                <HStack
                  marginBottom={5}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  key={index}>
                  <RowUserAvatar isHighLightName={item.isInvite} user={item} />
                  <Pressable
                    paddingLeft={4}
                    onPress={() => handleToggleInviteUser(index)}>
                    {!item.isInvite ? <AddMemberIcon /> : <RemoveMemberIcon />}
                  </Pressable>
                </HStack>
              );
            })}
        </ScrollView>
      </View>
      <Button
        onPress={handleSubmit}
        h={14.5}
        bg={COLORS.highlight}
        rounded="lg">
        <Text color="white">Save your changes</Text>
      </Button>
      <Modal isOpen={isShowing} onClose={close}>
        <ModalCard
          title="Exit?"
          description="Are you sure to exit “Create new group”. Your changes won’t be saved."
          cancelButton={
            <Button
              onPress={() => {
                setAllowGoBack(true);
                setTimeout(() => {
                  navigation.goBack();
                }, 100);
              }}
              variant="outline">
              Exit
            </Button>
          }
          confirmButton={<Button onPress={close}>Stay</Button>}
        />
      </Modal>
    </ScrollViewLayout>
  );
};

const styles = StyleSheet.create({
  groupContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 8,
  },
  memberContainer: {
    marginTop: 0,
    padding: 20,
    borderRadius: 8,
    marginBottom: 40,
  },

  pencilIcon: {
    borderRadius: 99,
    backgroundColor: '#7F7F7F',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

export default CreateGroupScreen;
