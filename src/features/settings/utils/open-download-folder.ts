import RNFS from 'react-native-fs';
export const openDownloadFolder = async () => {
  const downloadFolderPath = await RNFS.DocumentDirectoryPath;
  // Open the download folder using the system file explorer
  await RNFS.readDir(downloadFolderPath);
};
