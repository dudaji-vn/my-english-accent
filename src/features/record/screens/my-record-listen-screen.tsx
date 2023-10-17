import {NavigationProp, RouteProp} from '@react-navigation/native';
import {
  Button,
  HStack,
  Pressable,
  Text,
  VStack,
  View,
  useToast,
} from 'native-base';
import React from 'react';
import {X} from 'react-native-feather';
import {Modal} from '../../../components/modal';
import {ModalCard} from '../../../components/modal-card';
import {Toast} from '../../../components/toast';
import {COLORS} from '../../../constants/design-system';
import {SCREEN_NAMES} from '../../../constants/screen';
import {useModal} from '../../../hooks/use-modal';
import {Record} from '../../../types/record';
import {uploadAudio} from '../../../utils/upload-audio';
import {RecordCard} from '../components/record-card';
import {RecordedCard} from '../components/recorded-card';
import {SentenceContentCard} from '../components/sentence-content-card';
import {WordContentCard} from '../components/word-content-card';
import {useUpdateRecord} from '../hooks/use-update-record';

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
};

export const MyRecordListenScreen = ({navigation, route}: Props) => {
  const [record, setRecord] = React.useState<Record>(route.params?.record);
  const [currentItem, setCurrentItem] = React.useState<'word' | 'sentence'>();
  const [newRecordUri, setNewRecordUri] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const toast = useToast();
  const [isChanged, setIsChanged] = React.useState(false);
  const goBack = () => {
    if (!isChanged) {
      navigation.goBack();
      return;
    }
    navigation.navigate({
      name: SCREEN_NAMES.record,
      params: {
        needRefresh: true,
      },
    });
  };

  const {
    close: closeRecord,
    open: openRecord,
    isShowing: isShowingRecord,
  } = useModal();
  const {
    close: closeRecordAgain,
    open: openRecordAgain,
    isShowing: isShowingRecordAgain,
  } = useModal();
  const {
    open: openDelete,
    close: closeDelete,
    isShowing: isShowingDelete,
  } = useModal();
  const {
    open: openUnsaved,
    close: closeUnsaved,
    isShowing: isShowingUnsaved,
  } = useModal();
  const {updateRecord, isLoading, mutateAsync} = useUpdateRecord({
    onSuccess: data => {
      setIsChanged(true);
      if (!data) {
        navigation.navigate({
          name: SCREEN_NAMES.record,
          params: {
            needRefresh: true,
          },
        });
        return;
      }
      setRecord(data as Record);
      closeDelete();
      closeRecord();
    },
  });

  const handleDelete = async () => {
    if (currentItem === 'word') {
      updateRecord({
        _id: record._id,
        recordUrl: {
          ...record.recordUrl,
          word: null,
        },
      });
    } else if (currentItem === 'sentence') {
      updateRecord({
        _id: record._id,
        recordUrl: {
          ...record.recordUrl,
          sentence: null,
        },
      });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const uri = await uploadAudio({
      uri: newRecordUri!,
      name: record._id,
      type: 'audio/m4a',
    });
    if (currentItem === 'word') {
      await mutateAsync({
        _id: record._id,
        recordUrl: {
          ...record.recordUrl,
          word: uri,
        },
      });
    } else if (currentItem === 'sentence') {
      await mutateAsync({
        _id: record._id,
        recordUrl: {
          ...record.recordUrl,
          sentence: uri,
        },
      });
    }
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

    setIsSaving(false);
  };

  return (
    <View bg="white" h="full">
      <HStack h={14} alignItems="center" justifyContent="space-between">
        <Pressable p={5} onPress={goBack}>
          <X width={24} height={24} color={COLORS.text} />
        </Pressable>
      </HStack>

      <VStack px={5} py={2} space={5}>
        <RecordedCard
          onReRecord={() => {
            setCurrentItem('word');
            if (!record?.recordUrl?.word) {
              openRecord();
              return;
            }
            openRecordAgain();
          }}
          onDelete={() => {
            openDelete();
            setCurrentItem('word');
          }}
          recordUri={record?.recordUrl?.word}>
          <WordContentCard vocabulary={record.vocabulary} />
        </RecordedCard>
        <RecordedCard
          onReRecord={() => {
            setCurrentItem('sentence');
            if (!record?.recordUrl?.sentence) {
              openRecord();
              return;
            }
            openRecordAgain();
          }}
          onDelete={() => {
            openDelete();
            setCurrentItem('sentence');
          }}
          recordUri={record?.recordUrl?.sentence}>
          <SentenceContentCard vocabulary={record.vocabulary} />
        </RecordedCard>
      </VStack>
      <Modal isOpen={isShowingDelete} onClose={closeDelete}>
        <ModalCard
          title="Delete recording"
          description="Are you sure you want to delete this recording?"
          cancelButton={
            <Button onPress={closeDelete} variant="outline">
              Cancel
            </Button>
          }
          confirmButton={
            <Button isLoading={isLoading} onPress={handleDelete}>
              Delete
            </Button>
          }
        />
      </Modal>
      <Modal isOpen={isShowingRecordAgain} onClose={closeRecordAgain}>
        <ModalCard
          title="Record again"
          description={`Are you sure to record this ${currentItem} again?`}
          cancelButton={
            <Button onPress={closeRecordAgain} variant="outline">
              Cancel
            </Button>
          }
          confirmButton={
            <Button
              isLoading={isLoading}
              onPress={() => {
                closeRecordAgain();
                setTimeout(() => {
                  openRecord();
                }, 100);
              }}>
              Record
            </Button>
          }
        />
      </Modal>
      <Modal isTransparent isOpen={isShowingRecord} onClose={closeRecord}>
        <VStack space={5}>
          <RecordCard
            onHasRecord={uri => {
              setNewRecordUri(uri);
            }}
            onNoRecord={() => {
              setNewRecordUri(null);
            }}>
            {currentItem === 'word' ? (
              <WordContentCard vocabulary={record.vocabulary} />
            ) : (
              <SentenceContentCard vocabulary={record.vocabulary} />
            )}
          </RecordCard>
          <VStack>
            {newRecordUri && (
              <Button
                mt={5}
                _loading={{
                  opacity: 1,
                }}
                isLoading={isSaving}
                opacity={1}
                onPress={handleSave}>
                Save
              </Button>
            )}
            <Pressable
              p={5}
              onPress={() => {
                if (!newRecordUri) {
                  closeRecord();
                  return;
                }
                openUnsaved();
              }}
              alignSelf="center"
              justifyContent="center">
              <Text color="white">Cancel</Text>
            </Pressable>
          </VStack>
        </VStack>
      </Modal>
      <Modal isOpen={isShowingUnsaved} onClose={closeUnsaved}>
        <ModalCard
          title="Cancel recording"
          description="Are you sure to cancel your record?. Your change won’t be saved."
          cancelButton={
            <Button onPress={closeUnsaved} variant="outline">
              No
            </Button>
          }
          confirmButton={
            <Button
              onPress={() => {
                closeUnsaved();
                closeRecord();
                setNewRecordUri(null);
              }}>
              Yes
            </Button>
          }
        />
      </Modal>
    </View>
  );
};
