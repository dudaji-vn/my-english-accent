import React from 'react';
import {Platform} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import uuid from 'react-native-uuid';
const recorder = new AudioRecorderPlayer();

export const useAudioRecord = () => {
  const [cacheFilePath, setCacheFilePath] = React.useState('');
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [metering, setMetering] = React.useState(-36);

  async function startRecording() {
    const id = uuid.v4();
    const dirs = RNFetchBlob.fs.dirs;
    const path = Platform.select({
      ios: `${id}.m4a`,
      android: `${dirs.CacheDir}/${id}.mp3`,
    });
    await stopPlayer();
    await recorder.startRecorder(path, undefined, true);
    setIsRecording(true);

    recorder.addRecordBackListener(e => {
      const currentMetering = e.currentMetering || -36;
      setMetering(currentMetering);
      
    });
  }

  async function stopRecording() {
    try {
      const filePath = await recorder.stopRecorder();
      recorder.removeRecordBackListener();
      setCacheFilePath(filePath);
      setMetering(-36);
      setIsRecording(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function startPlayer() {
    await recorder.startPlayer(cacheFilePath);
    setIsPlaying(true);
    recorder.addPlayBackListener(e => {
      if (e.currentPosition === e.duration) {
        stopPlayer();
      }
    });
  }

  async function stopPlayer() {
    await recorder.stopPlayer();
    recorder.removePlayBackListener();
    setIsPlaying(false);
  }

  async function deleteRecord() {
    if (isPlaying) {
      await stopPlayer();
    }
    await RNFetchBlob.fs.unlink(cacheFilePath);
    setCacheFilePath('');
  }

  return {
    isPlaying,
    cacheFilePath,
    startPlayer,
    startRecording,
    stopRecording,
    stopPlayer,
    deleteRecord,
    metering,
    isRecording,
  };
};
