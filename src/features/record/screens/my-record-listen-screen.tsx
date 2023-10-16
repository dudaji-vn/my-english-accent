import {NavigationProp, RouteProp} from '@react-navigation/native';
import {VStack} from 'native-base';
import React from 'react';
import {View} from 'react-native';
import {Record} from '../../../types/record';
import {RecordedCard} from '../components/recorded-card';
import {SentenceContentCard} from '../components/sentence-content-card';
import {WordContentCard} from '../components/word-content-card';

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
};

export const MyRecordListenScreen = ({route}: Props) => {
  const record: Record = route.params?.record;
  return (
    <View>
      <VStack px={5} py={2} space={5}>
        <RecordedCard recordUri={record?.recordUrl?.word}>
          <WordContentCard vocabulary={record.vocabulary} />
        </RecordedCard>
        <RecordedCard recordUri={record?.recordUrl?.sentence}>
          <SentenceContentCard vocabulary={record.vocabulary} />
        </RecordedCard>
      </VStack>
    </View>
  );
};
