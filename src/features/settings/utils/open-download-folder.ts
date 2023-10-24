import {Linking, Platform} from 'react-native';
import RNFS from 'react-native-fs';

export const openDownloadFolder = async () => {
  const downloadFolderPath = await RNFS.DocumentDirectoryPath;
  // Open the download folder using the system file explorer
  await RNFS.readDir(downloadFolderPath);
};

export const openDownloadsDirectory = async () => {
  // const downloadsDirectoryPath = RNFS.ExternalDirectoryPath;
  // Linking.openURL(downloadsDirectoryPath);
  try {
    const downloadFolderPath = Platform.select({
      android: `${RNFS.ExternalDirectoryPath}`,
      ios: RNFS.DocumentDirectoryPath, // iOS doesn't have a dedicated download folder, so use Documents directory.
    });

    await RNFS.exists(downloadFolderPath as string);
    RNFS.readFile(downloadFolderPath as string, 'utf8');

    // Open the folder using a file manager or another suitable app
    // You can use a third-party package to open the file manager, such as 'react-native-file-opener':
    // https://github.com/huangzuizui/react-native-file-opener

    // Alternatively, you can display the folder path to the user and let them navigate there manually.
  } catch (error) {
    console.error('Error accessing the download folder:', error);
  }
};
