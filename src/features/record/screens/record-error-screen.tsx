import {View, Text} from 'react-native';
import React from 'react';
import {useRootSelector} from '../../../redux/reducers';

type Props = {};

const RecordErrorScreen = (props: Props) => {
  const failedUploads = useRootSelector(state => state.record.failedUploads);
  return (
    <View>
      <Text>Failed to upload {failedUploads.length} records.</Text>
    </View>
  );
};

export default RecordErrorScreen;
