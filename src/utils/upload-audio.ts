import axios from 'axios';
import uuid from 'react-native-uuid';
export const uploadAudio = async (uri: string) => {
  console.log('uri', uri);
  const id = uuid.v4();
  const file = {
    uri,
    name: `${id}.mp3`,
    type: 'audio/m4a',
  };
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'kctmadgr');
  formData.append('cloud_name', 'deowxipsu');
  const response = await axios
    .post('https://api.cloudinary.com/v1_1/deowxipsu/raw/upload', formData, {
      timeout: 10000,
      timeoutErrorMessage: 'Request timed out',
    })
    .catch(error => {
      console.log('error', error);
    });
  const data = response.data;
  return data.secure_url;
};
