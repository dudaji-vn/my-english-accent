import {useNavigation} from '@react-navigation/native';
import {Button, HStack, Pressable, ScrollView, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import BreadCrumb from '../../../../components/bread-crumb/bread-crumb';
import {Input} from '../../../../components/form';
import {PencilIcon} from '../../../../components/icons';
import AddMemberIcon from '../../../../components/icons/add-member-icon';
import AvatarIcon from '../../../../components/icons/avatar';
import RemoveMemberIcon from '../../../../components/icons/remove-member-icon';
import ScrollViewLayout from '../../../../components/layout/scroll-view-layout';
import {Modal} from '../../../../components/modal';
import {ModalCard} from '../../../../components/modal-card';
import UserAvatar from '../../../../components/user-avatar';
import {COLORS} from '../../../../constants/design-system';
import {useModal} from '../../../../hooks/use-modal';
import {uploadImage} from '../../../../utils/upload-image';
const CreateGroupScreen = () => {
  const {close, isShowing, open} = useModal();
  const [allowGoBack, setAllowGoBack] = useState(false);
  const navigation = useNavigation<any>();
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
  };
  return (
    <ScrollViewLayout>
      <BreadCrumb parentTitle="Listen" mainTitle="Create new group" />
      <View style={styles.groupContainer} bg={COLORS.white}>
        <Pressable onPress={handleCropAvatar} mb={8} alignItems={'center'}>
          <AvatarIcon />
          <View style={styles.pencilIcon}></View>
        </Pressable>
        <Text mb={2}>What's your group name?</Text>
        <Input placeholder="Enter group name" />
      </View>
      <View style={styles.memberContainer} bg={COLORS.white}>
        <HStack mb={2} justifyContent={'space-between'}>
          <Text>Add member</Text>
          <Text>(0)</Text>
        </HStack>
        <Input mb={5} typeInput="search" placeholder="Search" />
        <ScrollView nestedScrollEnabled style={{maxHeight: 330}}>
          {[1, 2, 3, 4].map((item, index) => {
            return (
              <HStack
                marginBottom={5}
                alignItems={'center'}
                justifyContent={'space-between'}
                key={index}>
                <HStack space={4} alignItems={'center'}>
                  <UserAvatar nation="ko" />
                  <View>
                    <Text style={styles.textName}>Display name</Text>
                    <Text
                      opacity={0.4}
                      fontWeight={'400'}
                      style={styles.textRole}>
                      Position
                    </Text>
                  </View>
                </HStack>
                <Pressable>
                  {index % 2 == 0 ? <AddMemberIcon /> : <RemoveMemberIcon />}
                </Pressable>
              </HStack>
            );
          })}
        </ScrollView>
      </View>
      <Button h={14.5} bg={COLORS.highlight} rounded="lg">
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
  textName: {
    color: COLORS.text,
    fontWeight: '500',
    fontSize: 16,
  },
  textRole: {
    color: COLORS.text,
    fontWeight: '300',
    fontSize: 16,
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
