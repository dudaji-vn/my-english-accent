import {NavigationProp} from '@react-navigation/native';
import {Button, HStack, Pressable, ScrollView, Text, VStack} from 'native-base';
import React from 'react';
import {AlertCircle, ChevronLeft, ChevronRight, X} from 'react-native-feather';
import {COLORS} from '../../../constants/design-system';
import {useUnsavedChange} from '../../../hooks/use-unsaved-change';
import {useModal} from '../../../hooks/use-modal';
import {ModalCard} from '../../../components/modal-card';
import {Modal} from '../../../components/modal';
import {RecordCard} from '../components/record-card';
import {WordContentCard} from '../components/word-content-card';
import {SentenceContentCard} from '../components/sentence-content-card';

type Props = {
  navigation: NavigationProp<any>;
};

const WordsRecordScreen = ({navigation}: Props) => {
  const {close, isShowing, open} = useModal();
  const {onAllowGoBack} = useUnsavedChange(true, navigation, open);

  return (
    <ScrollView bg="white">
      <HStack h={14} alignItems="center" justifyContent="space-between" px={5}>
        <Pressable onPress={navigation.goBack}>
          <X width={24} height={24} color={COLORS.text} />
        </Pressable>
        <HStack space={5}>
          <ChevronLeft width={24} height={24} color={COLORS.text} />
          <Text>
            <Text color={COLORS.highlight}>20</Text>/
            <Text opacity={0.3}>40</Text>
          </Text>
          <ChevronRight width={24} height={24} color={COLORS.text} />
        </HStack>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <AlertCircle width={24} height={24} color={COLORS.text} />
        </Pressable>
      </HStack>
      <VStack m={5} mt={1} space={5}>
        <RecordCard>
          <WordContentCard
            word={{
              text: 'Hi',
              pronunciation: 'ˈyo͞ozər ˈin(t)ərˌfās',
              meaning: 'Xin chào',
            }}
          />
        </RecordCard>
        <RecordCard>
          <SentenceContentCard
            dictionary={{
              text: 'Hi',
              textVietNam: 'Xin chào',
              textKorean: '안녕하세요',
              example: 'Hi, how are you?',
              exampleVI: 'Xin chào, bạn có khỏe không?',
              exampleKR: '안녕하세요, 어떻게 지내세요?',
            }}
          />
        </RecordCard>
      </VStack>
      <HStack mt={5} mx={5} space={1}>
        <Button onPress={open} variant="ghost">
          Skip
        </Button>
        <Button flex={1} h={16} onPress={open} variant="outline">
          Save
        </Button>
      </HStack>
      <Modal isOpen={isShowing} onClose={close}>
        <ModalCard
          title="Go back?"
          description="Are you sure to go back. Your record won’t be saved."
          cancelButton={
            <Button onPress={close} variant="outline">
              Cancel
            </Button>
          }
          confirmButton={<Button onPress={onAllowGoBack}>Go back</Button>}
        />
      </Modal>
    </ScrollView>
  );
};

export default WordsRecordScreen;
