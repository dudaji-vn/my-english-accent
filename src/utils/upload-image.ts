export const uploadImage = async (file: {
  uri: string;
  type: string;
  name: string;
}) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'kctmadgr');
  formData.append('cloud_name', 'deowxipsu');
  const response = await fetch(
    'https://api.cloudinary.com/v1_1/deowxipsu/image/upload',
    {
      method: 'post',
      body: formData,
    },
  );
  const data = await response.json();
  return data.secure_url;
};
