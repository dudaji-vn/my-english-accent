import {useState} from 'react';
import {useAudioRecord} from '../../../hooks/use-audio-record';
import {Record} from '../../../types/record';
type TempRecord = {
  _id: string;
  uri: string;
  isSaved: boolean;
};
export const useRecordScreen = () => {
  const audio = useAudioRecord();
  const [savedList, setSavedList] = useState<{
    [key: string]: Record;
  }>({});
  const savedListLength = Object.keys(savedList).length;

  const [currentTempRecordWord, setCurrentTempRecordWord] =
    useState<TempRecord | null>(null);

  const [currentTempRecordSentence, setCurrentTempRecordSentence] =
    useState<TempRecord | null>(null);
  return {
    ...audio,
    savedList,
    setSavedList,
    savedListLength,
    currentTempRecordWord,
    setCurrentTempRecordWord,
    currentTempRecordSentence,
    setCurrentTempRecordSentence,
  };
};
