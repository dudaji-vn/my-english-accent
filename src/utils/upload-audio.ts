import axios from 'axios';
import uuid from 'react-native-uuid';
export const uploadAudio = async (uri: string) => {
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
  const response = await axios.post(
    'https://api.cloudinary.com/v1_1/deowxipsu/raw/upload',
    formData,
    {
      timeout: 5000,
      timeoutErrorMessage: 'Request timed out',
    },
  );
  const data = response.data;
  return data.secure_url;
};
