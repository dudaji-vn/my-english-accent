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
import {ModalCard, ModalCardDelete} from '../../../components/modal-card';
import {Toast} from '../../../components/toast';
import {COLORS} from '../../../constants/design-system';
import {useModal} from '../../../hooks/use-modal';
import {Record} from '../../../types/record';
import {uploadAudio} from '../../../utils/upload-audio';
import {RecordCard, RecordCardMethods} from '../components/record-card';
import {RecordedCard, RecordedCardMethods} from '../components/recorded-card';
import {SentenceContentCard} from '../components/sentence-content-card';
import {WordContentCard} from '../components/word-content-card';
import {useUpdateRecord} from '../hooks/use-update-record';
import {useQueryClient} from '@tanstack/react-query';
import {PressableIcon} from '../../../components/pressable-icon';

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
};

export const MyRecordListenScreen = ({navigation, route}: Props) => {
  const refreshKey = route.params?.refreshKey;
  const queryClient = useQueryClient();
  const [record, setRecord] = React.useState<Record>(route.params?.record);
  const [currentItem, setCurrentItem] = React.useState<'word' | 'sentence'>();
  const [newRecordUri, setNewRecordUri] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const toast = useToast();

  const wordRef = React.useRef<RecordedCardMethods>(null);
  const sentenceRef = React.useRef<RecordedCardMethods>(null);
  const recordRef = React.useRef<RecordCardMethods>(null);

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
      setTimeout(() => {
        queryClient.invalidateQueries(refreshKey);
        queryClient.invalidateQueries(['progress']);
      }, 100);
      if (!data) {
        navigation.goBack();
        return;
      }
      setNewRecordUri(null);
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
    const uri = await uploadAudio(newRecordUri as string);
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
    setIsSaving(false);
    setTimeout(() => {
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
    }, 100);

    recordRef.current?.handlePressDelete();
  };

  return (
    <View bg="white" h="full">
      <HStack h={14} alignItems="center" justifyContent="space-between">
        <PressableIcon
          onPress={() => {
            navigation.goBack();
          }}>
          <X width={24} height={24} color={COLORS.text} />
        </PressableIcon>
      </HStack>

      <VStack px={5} py={2} space={5}>
        <RecordedCard
          ref={wordRef}
          onPressPlay={() => {
            sentenceRef.current?.stopPlayer();
          }}
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
          onPressPlay={() => {
            wordRef.current?.stopPlayer();
          }}
          ref={sentenceRef}
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
        <ModalCardDelete
          title="Delete recording"
          description="Are you sure you want to delete this recording?"
          isLoading={isLoading}
          onDelete={handleDelete}
          onCancel={closeDelete}
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
            ref={recordRef}
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
