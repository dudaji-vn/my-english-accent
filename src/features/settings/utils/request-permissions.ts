import {PERMISSIONS, requestMultiple} from 'react-native-permissions';

export const requestPermissions = async () => {
  const permissions = [
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.RECORD_AUDIO,
    PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
    PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  ];
  const statuses = await requestMultiple(permissions);
  alert(JSON.stringify(statuses));
  return statuses;
};
