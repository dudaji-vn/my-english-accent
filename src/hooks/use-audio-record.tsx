import React from 'react';
import {Platform} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import uuid from 'react-native-uuid';
const recorder = new AudioRecorderPlayer();
const MIN_METERING = -36;
const SILENCE_THRESHOLD = -30; // Adjust this value as needed
const SILENCE_DURATION = 1000;
export const useAudioRecord = (path?: string) => {
  const [cacheFilePath, setCacheFilePath] = React.useState(path || '');
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [metering, setMetering] = React.useState(MIN_METERING);

  React.useEffect(() => {
    if (path) {
      setCacheFilePath(path);
    }
  }, [path]);

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

    let silenceTimeout: NodeJS.Timeout | null = null;

    recorder.addRecordBackListener(e => {
      const currentMetering = e.currentMetering || MIN_METERING;
      setMetering(currentMetering);

      // Check for silence and start a timer
      if (currentMetering <= SILENCE_THRESHOLD) {
        if (!silenceTimeout) {
          silenceTimeout = setTimeout(stopRecording, SILENCE_DURATION);
        }
      } else {
        // Reset the silence timer if there's sound detected
        if (silenceTimeout) {
          clearTimeout(silenceTimeout);
          silenceTimeout = null;
        }
      }
    });
  }

  async function stopRecording() {
    try {
      const filePath = await recorder.stopRecorder();
      recorder.removeRecordBackListener();
      setCacheFilePath(filePath);
      setMetering(MIN_METERING);
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
