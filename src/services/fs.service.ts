import RNFS from 'react-native-fs';
export interface IDownload {
  url: string;
  fileName: string;
}
export class FSService {
  directoryPath = RNFS.DocumentDirectoryPath;
  async downloadInfo() {
    /**
        listUsers: [
            {
                _id,
                avatar:`_id.png`,
                

            }
        ] 
    
     */
  }
  async downloadAudioToMyDevice(itemsToDownload: IDownload[]) {
    const downloadPromises = itemsToDownload.map(async item => {
      try {
        const response = await RNFS.downloadFile({
          fromUrl: item.url,
          toFile: `${this.directoryPath}/${item.fileName}`,
        }).promise;

        if (response.statusCode === 200) {
          console.log(`Downloaded and saved ${item.fileName} successfully.`);
        } else {
          console.error(`Failed to download ${item.fileName}`);
        }
      } catch (error) {
        console.error(`Error downloading ${item.fileName}: ${error}`);
      }
    });

    try {
      await Promise.all(downloadPromises);
      console.log('All downloads completed.');
    } catch (error) {
      console.error('One or more downloads failed:', error);
    }
  }
}
